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
            // }
        }
    });
}

function searchAll(){
    // Declare variables
    let input;
    input = document.getElementById('indexInput');
    // filter = input.value.toUpperCase();
    // ul = document.getElementById("myUL");
    // li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    // for (i = 0; i < li.length; i++) {
    //     a = li[i].getElementsByTagName("a")[0];
    //     txtValue = a.textContent || a.innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //         li[i].style.display = "";
    //     } else {
    //         li[i].style.display = "none";
    //     }
    // }
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
