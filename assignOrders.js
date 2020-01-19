// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.

var settingsRestaurants = {
    "url": "https://roo-api-sandbox.deliveroo.net/restaurants",
    "method": "GET",
    "async": false,
    "timeout": 0,
    "headers": {
        "Access-Control-Allow-Origin": "localhost",
        "api-key": "ab764166-02d3-4335-b8d7-d6e06d139c2f"
    },
};

var settingsRiders = {
    "url": "https://roo-api-sandbox.deliveroo.net/riders",
    "method": "GET",
    "async": false,
    "timeout": 0,
    "headers": {
        "Access-Control-Allow-Origin": "localhost",
        "api-key": "ab764166-02d3-4335-b8d7-d6e06d139c2f"
    },
};

var settingsOrders = {
    "url": "https://roo-api-sandbox.deliveroo.net/orders",
    "method": "GET",
    "async": false,
    "timeout": 0,
    "headers": {
        "Access-Control-Allow-Origin": "localhost",
        "api-key": "ab764166-02d3-4335-b8d7-d6e06d139c2f"
    },
};


function acquireOrderID() {
    var orders = null;
    $.ajax(settingsOrders).done(function (response) {
        let orderID;
        let order = response;
        console.log(order);
        orders = new Array(order.length);
        for (let index = 0; index < order.length; index++) {
            orderID = order[index]["id"];
            orders[index] = orderID;
            // console.log(orderID);
        }
        // console.log(orders)
    }, this);
    // console.log(orders);
    return orders;
}

function acquireOrderRestaurant() {
    var orders = null;
    $.ajax(settingsOrders).done(function (response) {
        let restaurantID;
        let order = response;
        console.log(order);
        orders = new Array(order.length);
        for (let index = 0; index < order.length; index++) {
            restaurantID = order[index]["restaurant_id"];
            orders[index] = restaurantID;
            // console.log(restaurantID);
        }
    }, this);
    console.log(orders);
    return orders;
}

function acquireRestaurantLocation() {
    var restaurants = null;
    $.ajax(settingsRestaurants).done(function (response) {
        // let order = response;
        // console.log(order);
        let branches = response;
        // console.log(list_entry);
        restaurants = new Array(branches.length*2);
        let restaurantIndex = 0;
        let restaurant, branchLocation, branchLat, branchLong;
        for (let index = 0; index < branches.length; index++) {
            let list_entry = branches[index];
            // openStatus = list_entry["restaurant_branches"][branch]["status"];
            // for (let branch in list_entry){
            restaurant = list_entry["restaurant_org"];

            for (let branch in list_entry["restaurant_branches"]) {
                //works for each branch name
                branchLocation = list_entry["restaurant_branches"][branch]['branch_name'];
                branchLat = list_entry["restaurant_branches"][branch]["location"]["lat"];
                branchLong = list_entry["restaurant_branches"][branch]["location"]["long"];
                console.log(branchLat);
                console.log(branchLong);
                restaurants[restaurantIndex] = branchLat;
                restaurants[restaurantIndex+1] = branchLong;
                restaurantIndex++;
                restaurantIndex++;
            }
        }
    }, this);
    console.log(restaurants);
    return restaurants;
}

function acquireRiderLocation() {
    var riders = null;
    $.ajax(settingsRiders).done(function (response) {
        // let order = response;
        // console.log(order);
        let allRiders = response;
        let riderIndex = 0;
        // console.log(list_entry);
        riders = new Array(allRiders.length*2);
        let restaurantIndex = 0;
        let ridersLat, ridersLong;
        for (let index = 0; index < allRiders.length; index++) {
            ridersLat = allRiders[index]["location"]["lat"];
            ridersLong = allRiders[index]["location"]["long"];
            console.log(ridersLat);
            console.log(ridersLong);
            riders[riderIndex] = ridersLat;
            riders[riderIndex + 1] = ridersLong;
            riderIndex++;
            riderIndex++;
        }
    }, this);
    console.log(riders);
    return riders;
}

function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344
        return dist;
    }
}

function populateRestaurant() {
    // console.log("ran stuff");
        $.ajax(settings).done(function (response) {
        console.log(response);
        let branches = response;
        let currentBranch, template, tbody, clone, tgt;
        for(let index = 0; index < branches.length; index++)
        {
            let list_entry = branches[index];
            // console.log(list_entry);
            // for (let branch in list_entry){
                currentBranch = list_entry["restaurant_org"];
            // for (let branch in list_entry["restaurant_branches"]) {

                //works for each branch name
                // currentBranch = list_entry["restaurant_branches"][branch]['branch_name'];

                // Instantiate the table with the existing HTML tbody
                // and the row with the template
                template = document.querySelector('#restaurants');

                // Clone the new row and insert it into the table
                // tbody = document.querySelector("tbody");
                clone = template.content.cloneNode(true);
                tbody = clone.querySelector("div.text-here");
                tbody.textContent = currentBranch;
                // console.log(clone);

                tgt = document.querySelector("#contains-restaurants");
                tgt.appendChild(clone);
            // }
        }
    });
}

function searchAll(){
    // Declare variables
    let input;
    $.ajax(settings).done(function (response) {
        console.log(response);
        let branches = response;
        let currentBranch, template, tbody, clone, tgt;
        tgt = document.querySelector("#contains-restaurants");
        tgt.innerHTML = "";
        for(let index = 0; index < branches.length; index++)
        {
            let list_entry = branches[index];
            // console.log(list_entry);
            // for (let branch in list_entry){
            input = document.getElementById('indexInput').value;
            currentBranch = list_entry["restaurant_org"];
            // for (let branch in list_entry["restaurant_branches"]) {

            //works for each branch name
            // currentBranch = list_entry["restaurant_branches"][branch]['branch_name'];

            // Instantiate the table with the existing HTML tbody
            // and the row with the template
            template = document.querySelector('#restaurants');

            // Clone the new row and insert it into the table
            // tbody = document.querySelector("tbody");
            console.log(input);
            // console.log(currentBranch);
            if (currentBranch.includes(input)) {
                console.log(currentBranch);
                clone = template.content.cloneNode(true);
                tbody = clone.querySelector("div.text-here");
                tbody.textContent = currentBranch;
                // console.log(clone);

                // tgt = document.querySelector("#contains-restaurants");
                // tgt.innerHTML = "";
                tgt.appendChild(clone);
            }
            // }
        }
    });
}
