
// String formatting method
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

// requires that html file that imports this script also imports InternalAPIRequests.js

// TODO:Add input validation for zip 
var zip = location.href.substr(location.href.indexOf("?")+1);

var generic_card = '<div class="carousel-item ">' + 
                '<div class="card" style="width: 800px; height: 480px; padding: 25px 100px">' + 
                  '<div class="row">' + 
                    '<div class="card-block">' + 
                      '<h4 class="card-title">{0}</h4>' + 
                      '<p class="card-text">{1} / {2}</p>' + 
                    '</div>' + 
                    '<div class="container" style="height:250px; width:332px">' + 
                      '<img class="img-responsive" style="height:360px; width:250px" src="{3}" alt="Card image cap">' + 
                    '</div>' + 
                  '</div>' + 
                '</div>'

httpGetReps(zip,function(resp) {
    var reps = JSON.parse(resp);

    console.log(reps)
    reps.forEach(function(r) {
        $(".carousel-inner").append( generic_card.format(r['title'] + ' ' + r['firstName'] + ' ' +  r['lastName'], r['party'], r['state'], r['image_url']) );
    });

    $(".dummy").remove()
    $(".carousel-item:nth-of-type(1)").addClass("active");
});



