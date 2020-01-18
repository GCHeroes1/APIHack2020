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
            // var response2 = JSON.parse(response);
            let branches = response[0]['restaurant_branches'];
            // console.log(branches);
            // console.log("test");
            // console.log(branches[1]);
            // console.log("test2");
            // console.log(branches[1]['branch_name']);
            // console.log(branches[2]['branch_name']);
            let index = 0;
            let currentBranch;
            let template;
            let tbody;
            let clone;
            let td;
            for (let branch in branches) {
                // console.log(currentBranch);
                // console.log(branches[1]);
                // console.log(branch);
                currentBranch = branches[branch]['branch_name'];
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
                index++;
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

