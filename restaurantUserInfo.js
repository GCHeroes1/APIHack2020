var cord = document.getElementById("Location");
var d = new Date();
var tempMin = (d.getMinutes()).toString();
if (d.getMinutes() < 10){
    tempMin = "0" + tempMin;
}
var time = "<br>Time: "+ d.getHours() + ":" + tempMin;
var UserLat = 0;
var UserLong = 0;
function getLocation() {
    if (navigator.geolocation) {
        //console.log("Your browser supports geolocation");
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        //console.log("Geolocation is not supported by this browser.");
        cord.innerHTML = "Geolocation is not supported by this browser." + time;
    }
}

function showPosition(position) {
    UserLat = (Math.round(position.coords.latitude*10000)/10000);
    UserLong = (Math.round(position.coords.longitude*10000)/10000);
    //console.log("Latitude: " + UserLat +
    //   "\nLongitude: " + UserLong);
    cord.innerHTML = "Latitude: " + UserLat +
        "<br>Longitude: " + UserLong + time;

}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            cord.innerHTML = "User denied the request for Geolocation." + time;
            break;
        case error.POSITION_UNAVAILABLE:
            cord.innerHTML = "Location information is unavailable." + time;
            break;
        case error.TIMEOUT:
            cord.innerHTML = "The request to get user location timed out." + time;
            break;
        default:
            cord.innerHTML = "An unknown error occurred." + "<br>Time: "+ time;
            break;
    }
}