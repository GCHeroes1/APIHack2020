// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.

var settings = {
    "url": "https://roo-api-sandbox.deliveroo.net/restaurants",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Access-Control-Allow-Origin": "localhost",
        "api-key": "88303f66-0fc5-4b97-adab-490634908445"
    },
};

function populateClosed() {
    // console.log("ran stuff");
        $.ajax(settings).done(function (response) {
        console.log(response);
        let branches = response;
        let restaurant;
        let template;
        let tbody;
        let clone;
        let tgt;
        let branchLocation;
        let openStatus;
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
                if (openStatus == "CLOSED") {
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

function searchClosed(){
    // Declare variables
    let input;
    $.ajax(settings).done(function (response) {
        console.log(response);
        let branches = response;
        let template, tbody, clone, tgt, branchLocation, openStatus;
        tgt = document.querySelector("#contains-restaurants");
        tgt.innerHTML = "";
        for (let index = 0; index < branches.length; index++) {
            let list_entry = branches[index];
            // console.log(list_entry);
            // for (let branch in list_entry){
            restaurant = list_entry["restaurant_org"];
            for (let branch in list_entry["restaurant_branches"]) {
                input = document.getElementById('closeInput').value;
                //works for each branch name
                branchLocation = list_entry["restaurant_branches"][branch]['branch_name'];
                openStatus = list_entry["restaurant_branches"][branch]["status"];

                template = document.querySelector('#restaurants');

                // console.log(input);
                // console.log(restaurant);
                if (restaurant.includes(input)) {
                    if (openStatus == "CLOSED") {
                        // console.log(openStatus);
                        // console.log(restaurant);
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
