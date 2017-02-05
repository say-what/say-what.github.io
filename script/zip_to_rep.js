
// requires that html file that imports this script also imports InternalAPIRequests.js

// TODO:Add input validation for zip 
var zip = location.href.substr(location.href.indexOf("?")+1);


httpGetReps(zip,function(resp) {
    var reps = JSON.parse(resp);
    console.log(reps);
    // Add reps data to cards
});



