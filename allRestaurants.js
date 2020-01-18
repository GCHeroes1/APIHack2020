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
            let currentBranch;
            let template;
            let tbody;
            let clone;
            let tgt;
            for(let index = 0; index < branches.length; index++)
            {
                let list_entry = branches[index];
                // console.log(list_entry);
                for (let branch in list_entry["restaurant_branches"]) {
                    // console.log(currentBranch);
                    // console.log(branches[1]);
                    // console.log(branch);
                    currentBranch = list_entry["restaurant_branches"][branch]['branch_name'];
                    // console.log(currentBranch);
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
                }
            }
        });

        // // Instantiate the table with the existing HTML tbody
        // // and the row with the template
        // var template = document.querySelector('#productrow');
        //
        // // Clone the new row and insert it into the table
        // var tbody = document.querySelector("tbody");
        // var clone = template.content.cloneNode(true);
        // var td = clone.querySelectorAll("td");
        // td[0].textContent = "1235646565";
        //
        // tbody.appendChild(clone);
        //
        // // Clone the new row and insert it into the table
        // var clone2 = template.content.cloneNode(true);
        // td = clone2.querySelectorAll("td");
        // td[0].textContent = "0384928528";
        // td[1].textContent = "Acme Kidney Beans 2";
        //
        // tbody.appendChild(clone2);
}

