// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.

var settings = {
    "url": "http://localhost:8080/restaurants",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "api-key": "88303f66-0fc5-4b97-adab-490634908445"
    },
};

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
    return deg * (Math.PI / 180)
}

function populateRestaurant() {
    // console.log("ran stuff");
        $.ajax(settings).done(function (response) {
        console.log(response);
        let branches = response;
        let currentBranch, template, tbody, clone, tgt, tdist, tride, lat, long, distanceFromUser, closestBranch, RiderNumber, queue;
        let start = 1;
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

                distanceFromUser = 40000; //order of length of equator: nothing can be as large as this distance
                closestBranch = 0;
                currentBranch = list_entry["restaurant_org"];

                //console.log(Object.keys(list_entry["restaurant_branches"]).length);
                for (let i = start; i < Object.keys(list_entry["restaurant_branches"]).length; i++){
                    lat = parseFloat((list_entry["restaurant_branches"][i.toString()]["location"]["lat"]));
                    long = parseFloat((list_entry["restaurant_branches"][i.toString()]["location"]["long"]));
                    console.log(getDistanceFromLatLonInKm(lat,long,UserLat,UserLong));
                    if (getDistanceFromLatLonInKm(lat,long,UserLat,UserLong) < distanceFromUser){
                        distanceFromUser = getDistanceFromLatLonInKm(lat,long,UserLat,UserLong);
                        closestBranch = i;
                    }
                }
                start += Object.keys(list_entry["restaurant_branches"]).length + 1;
                console.log(start);
                template = document.querySelector('#restaurants');

                // Clone the new row and insert it into the table
                // tbody = document.querySelector("tbody");
                clone = template.content.cloneNode(true);
                //need to get the dropdown here
                tbody = clone.querySelector("div.text-here");
                tbody.textContent = currentBranch;
                tdist = clone.querySelector("div.Distance-from-you");
                tdist.textContent = distanceFromUser + "km away";
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

