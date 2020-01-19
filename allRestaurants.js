// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.

var settings = {
    "url": "https://roo-api-sandbox.deliveroo.net/restaurants",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Access-Control-Allow-Origin": "localhost",
        "api-key": "ab764166-02d3-4335-b8d7-d6e06d139c2f"
    },
};

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
                getLocation();
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

var cord = document.getElementById("Location");
var UserLat = 0;
var UserLong = 0;
function getLocation() {
    if (navigator.geolocation) {
        //console.log("Your browser supports geolocation");
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        //console.log("Geolocation is not supported by this browser.");
        cord.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    UserLat = position.coords.latitude;
    UserLong = position.coords.longitude;
    /console.log("Latitude: " + UserLat +
     //   "\nLongitude: " + UserLong);
    cord.innerHTML = "Latitude: " + UserLat +
        "<br>Longitude: " + UserLong;

}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            cord.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            cord.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            cord.innerHTML = "The request to get user location timed out.";
            break;
        default:
            cord.innerHTML = "An unknown error occurred.";
            break;
    }
}
/*
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {//this gets the distance in crow flies
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}*/