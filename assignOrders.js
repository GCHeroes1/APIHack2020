// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.

var settingsRestaurants = {
    "url": "https://roo-api-sandbox.deliveroo.net/restaurants",
    "method": "GET",
    "async": false,
    "timeout": 0,
    "headers": {
        "api-key": "88303f66-0fc5-4b97-adab-490634908445"
    },
};

var settingsRiders = {
    "url": "https://roo-api-sandbox.deliveroo.net/riders",
    "method": "GET",
    "async": false,
    "timeout": 0,
    "headers": {
        "api-key": "88303f66-0fc5-4b97-adab-490634908445"
    },
};

var settingsOrders = {
    "url": "https://roo-api-sandbox.deliveroo.net/orders",
    "method": "GET",
    "async": false,
    "timeout": 0,
    "headers": {
        "api-key": "88303f66-0fc5-4b97-adab-490634908445"
    },
};

function delegateOrders(){
    var orders = null;
    $.ajax(settingsOrders).done(function (response) {
        let orderID, restaurantID, ordersIndex;
        let order = response;
        // console.log(order);
        orders = new Array(order.length*2);
        ordersIndex = 0;
        for (let index = 0; index < order.length; index++) {
            orderID = order[index]["id"];
            restaurantID = order[index]["restaurant_id"];
            orders[ordersIndex] = orderID;
            orders[ordersIndex+1] = restaurantID;
            ordersIndex+=2;
            // console.log(orderID);
        }
        // console.log(orders)
    }, this);
    console.log(orders);
    // for (let orderArrayIndex = 0; orderArrayIndex < ((orders.length/2)-1); orderArrayIndex+=2){
        calculateDistanceRiderRestaurant(orders[0+1]);
    // }
    // return orders;
}

function calculateDistanceRiderRestaurant(restaurantID){
    let riderLocation = acquireRiderLocation();
    let restaurantLocation = acquireRestaurantLocation();
    let arrayIndexing = (riderLocation.length/3)-1;
    // for (let restaurantIndex = 0; restaurantIndex < ((restaurantLocation.length/3)-1); restaurantIndex+=3){
        let nameIndex, riderName, restaurantLocationIndex, lat1, lat2, lon1, lon2;
        // let restaurantIndex = 0;
        let minimumSoFar = 10000000;
        let minimumArray = new Array(arrayIndexing);
        let riderNames = new Array((riderLocation.length/3)-1);
        let riderLocationIndex = 0;
        for (let riderIndex = 0; riderIndex < arrayIndexing ; riderIndex++){
            lat1 = riderLocation[riderLocationIndex];
            lon1 = riderLocation[riderLocationIndex+1];
            lat2 = restaurantLocation[restaurantID];
            lon2 = restaurantLocation[restaurantID+1];
            // lat2 = restaurantLocation[restaurantIndex];
            // lon2 = restaurantLocation[restaurantIndex+1];
            minimumArray[riderIndex] = distance(lat1, lon1, lat2, lon2);
            riderNames[riderIndex] = riderLocation[riderLocationIndex+2];
            // if (minimumArray[riderIndex] < minimumSoFar){
            //     minimumSoFar = minimumArray[riderIndex];
            // }
            if (minimumArray[riderIndex] == 0){
                // console.log (lat1);
                // console.log (lat2);
                // console.log (lon1);
                // console.log (lon2);
            }
            riderLocationIndex+=3;
        }
        console.log(minimumArray);
        minimumSoFar = Math.min.apply(Math, minimumArray);
        nameIndex = minimumArray.indexOf(minimumSoFar);
        riderName = riderNames[nameIndex];
        console.log(minimumSoFar);
        console.log(riderName);
        console.log(restaurantLocation[(restaurantID*3)+2]);
        // console.log(restaurantLocation[(restaurantIndex*3)+2]);
        // restaurantLocationIndex+=3;
        // break;
        // console.log(minimumSoFar);
    // }
}
function acquireOrderID() {
    var orders = null;
    $.ajax(settingsOrders).done(function (response) {
        let orderID;
        let order = response;
        // console.log(order);
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
        // console.log(order);
        orders = new Array(order.length);
        for (let index = 0; index < order.length; index++) {
            restaurantID = order[index]["restaurant_id"];
            orders[index] = restaurantID;
            // console.log(restaurantID);
        }
    }, this);
    // console.log(orders);
    return orders;
}

function acquireRestaurantLocation() {
    var restaurants = null;
    $.ajax(settingsRestaurants).done(function (response) {
        let branches = response;
        restaurants = new Array(branches.length*3);
        let restaurantIndex = 0;
        let restaurant, branchLocation, branchLat, branchLong, branchName;
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
                branchName = list_entry["restaurant_branches"][branch]["branch_name"] + " - " + restaurant;
                restaurants[restaurantIndex] = branchLat;
                restaurants[restaurantIndex+1] = branchLong;
                restaurants[restaurantIndex+2] = branchName;
                restaurantIndex+=3;
            }
        }
    }, this);
    // console.log(restaurants);
    return restaurants;
}

function acquireRiderLocation() {
    var riders = null;
    $.ajax(settingsRiders).done(function (response) {
        let allRiders = response;
        let riderIndex = 0;
        riders = new Array(allRiders.length*3);
        let ridersLat, ridersLong, ridersName;
        for (let index = 0; index < allRiders.length; index++) {
            ridersLat = allRiders[index]["location"]["lat"];
            ridersLong = allRiders[index]["location"]["long"];
            ridersName = allRiders[index]["id"]; // TODO: change to rider name if you want to test shit
            riders[riderIndex] = ridersLat;
            riders[riderIndex + 1] = ridersLong;
            riders[riderIndex + 2] = ridersName;
            riderIndex+=3;
        }
    }, this);
    // console.log(riders);
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
