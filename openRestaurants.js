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

function populateOpen() {
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

