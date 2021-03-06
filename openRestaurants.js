// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.

var settingsToken = {
    "url": "http://localhost:8080/token",
    "method": "GET",
    "async": false,
    "timeout": 1000
};

var token = null;
$.ajax(settingsToken).done(function (response) {
    token = response["token"];
});

var settings = {
    "url": "http://localhost:8080/restaurants",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "api-key": token
    },
};

function populateOpen() {
// console.log("ran stuff");
        $.ajax(settings).done(function (response) {
        console.log(response);
        let branches = response;
        let restaurant, template, tbody, clone, tgt, branchLocation, openStatus;
        for (let index = 0; index < branches.length; index++) {
            let list_entry = branches[index];
            // console.log(list_entry);
            // for (let branch in list_entry){
            restaurant = list_entry["restaurant_org"];
            for (let branch in list_entry["restaurant_branches"]) {

                //works for each branch name
                branchLocation = list_entry["restaurant_branches"][branch]['branch_name'];
                openStatus = list_entry["restaurant_branches"][branch]["status"];
                // console.log(openStatus);

                // Instantiate the table with the existing HTML tbody
                // and the row with the template
                template = document.querySelector('#restaurants');

                // Clone the new row and insert it into the table
                if (openStatus == "OPEN") {
                    // tbody = document.querySelector("tbody");
                    clone = template.content.cloneNode(true);
                    tbody = clone.querySelector("div.text-here");
                    tbody.textContent = restaurant + " - " + branchLocation;
                    tgt = document.querySelector("#contains-restaurants");
                    tgt.appendChild(clone);
                }
                // console.log(clone);
            }
        }
    });
}

function searchOpen(){
    // Declare variables
    let input;
    $.ajax(settings).done(function (response) {
        console.log(response);
        let branches = response;
        let template, tbody, clone, tgt, branchLocation;
        tgt = document.querySelector("#contains-restaurants");
        tgt.innerHTML = "";
        for (let index = 0; index < branches.length; index++) {
            let list_entry = branches[index];
            // console.log(list_entry);
            // for (let branch in list_entry){
            restaurant = list_entry["restaurant_org"];
            for (let branch in list_entry["restaurant_branches"]) {
                input = document.getElementById('openInput').value;
                //works for each branch name
                branchLocation = list_entry["restaurant_branches"][branch]['branch_name'];
                openStatus = list_entry["restaurant_branches"][branch]["status"];

                template = document.querySelector('#restaurants');

                console.log(input);
                console.log(restaurant);
                // console.log(currentBranch);
                if (restaurant.includes(input)) {
                    if (openStatus == "OPEN") {
                        console.log(restaurant);
                        clone = template.content.cloneNode(true);
                        tbody = clone.querySelector("div.text-here");
                        tbody.textContent = restaurant + " - " + branchLocation;
                        // console.log(clone);

                        tgt.appendChild(clone);
                    }
                }
            }
        }
    });
}