// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.

var settingsRestaurants = {
    "url": "http://localhost:8080/restaurants",
    "method": "GET",
    "async": false,
    "timeout": 0,
    "headers": {
        "api-key": "88303f66-0fc5-4b97-adab-490634908445"
    },
};

var settingsRiders = {
    "url": "http://localhost:8080/riders",
    "method": "GET",
    "async": false,
    "timeout": 0,
    "headers": {
        "api-key": "88303f66-0fc5-4b97-adab-490634908445"
    },
};

var settingsOrders = {
    "url": "http://localhost:8080/orders",
    "method": "GET",
    "async": false,
    "timeout": 0,
    "headers": {
        "api-key": "88303f66-0fc5-4b97-adab-490634908445"
    },
};

var riders = {};
$.ajax(settingsRiders).done(function (response) {
    riders = {};
    let rider;
    for (rider of response) {
        riders[rider.id] = rider;
        delete riders[rider.id]["id"];
    }
});

var restaurants = {};
$.ajax(settingsRestaurants).done(function (response) {
    restaurants = {};
    let org, restaurant;
    for (org of response) {
        for (restaurant in org["restaurant_branches"]) {
            if (org["restaurant_branches"].hasOwnProperty(restaurant)) {
                restaurants[restaurant] = org["restaurant_branches"][restaurant];
            }
        }
    }
});

function delegateOrders() {
    var orders = null;
    let whatrestaurantidisthisorder = {};
    let orderID;
    $.ajax(settingsOrders).done(function (response) {
        let restaurantID, ordersIndex;
        let order = response;
        orders = new Array(order.length * 2);
        for (let index = 0; index < order.length; index++) {
            orderID = order[index]["id"];
            restaurantID = order[index]["restaurant_id"];
            whatrestaurantidisthisorder[orderID] = restaurantID;
        }
    }, this);
    let anOrder, template, tbody, clone, tgt;
    template = document.querySelector('#orders');
    let cardBody;
    for (anOrder in whatrestaurantidisthisorder) {
        [riderId, minDistance] = assignNearestRider(whatrestaurantidisthisorder[anOrder]);

        clone = template.content.cloneNode(true);
        tbody = clone.querySelector("div.text-here");
        if (minDistance >= 0) {
            tbody.textContent = "ORDER #" + anOrder + " is assigned to RIDER #" + riderId + " who is " + minDistance + " km away";
        } else {
            tbody.textContent = "ORDER #" + anOrder + " is waiting for a rider to become available.";
            cardBody = clone.querySelector("div.border-left-primary");
            cardBody.classList.remove("border-left-primary");
            cardBody.classList.add("border-left-warning");
        }
        tgt = document.querySelector("#contains-restaurants");
        tgt.appendChild(clone);
    }
}


function assignNearestRider(restaurantID) {
    let tgtRider, lat1, lat2, lon1, lon2;
    let minDistance = -1;
    let riderId;
    for (riderId in riders) {
        [lat1, lon1] = acquireRiderLocation(riderId);
        [lat2, lon2] = acquireRestaurantLocation(restaurantID);

        let tempDist = distance(lat1, lon1, lat2, lon2);
        if (tempDist < minDistance || minDistance < 0) {
            tgtRider = riderId;
            minDistance = tempDist;
        }
    }
    console.log(tgtRider);
    console.log(minDistance);
    delete riders[tgtRider];
    return [tgtRider, minDistance];
}


function acquireRestaurantLocation(restaurantID) {
    let lat, long;
    lat = restaurants[restaurantID]["location"]["lat"];
    long = restaurants[restaurantID]["location"]["long"];
    return [lat, long];
}

function acquireRiderLocation(riderId) {
    let lat, long;
    lat = riders[riderId]["location"]["lat"];
    long = riders[riderId]["location"]["long"];
    return [lat, long];
}

function distance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (Math.round(R * c * 100) / 100);  // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

