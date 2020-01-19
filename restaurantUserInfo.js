var cord = document.getElementById("Location");
var d = new Date();
var time = "<br>Time: "+ d.getHours() + ":" + d.getMinutes();
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
    UserLat = position.coords.latitude;
    UserLong = position.coords.longitude;
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

