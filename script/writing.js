
function httpQueryTemplates(issue,medium,callback)
{
	var url = 'https://hab2017.azurewebsites.net/api/querytemplate/'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.open("POST", url, true); // true for asynchronous 
	xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    xmlHttp.send("{'issue':'"+issue+"','medium':'"+medium+"'}");
}

var zip = location.href.substr(location.href.indexOf("?")+1);
var template = {};
//httpGetTemplates("issue_example_id",printCallback)
httpQueryTemplates(issue,medium,function(resp) {
	console.log("here")
    var templates = JSON.parse(resp);
    templates.forEach(function(item){
    	console.log("for each")
    	$("#inner_carousel").append($('<div class="carousel-item"><div class="card" style="width: 720px; padding: 25px 200px"><img class="card-img-top" src="..." alt="Card image cap"><div class="card-block"><h4 class="card-title">Card title</h4><p class="card-text">'+item.text+'</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>'))
    });


})
$("#use_template_button").click(function() {

	template.medium = 'call';
	template.lastName = "BLAHHHHH"

	var curr = $(".carousel-item.active")
	var html = curr[0].innerHTML

	$(".carousel-control-prev").hide()
	$(".carousel-control-next").hide()

	$(".carousel").each(function(){
        $(this).carousel({
            interval: false
        });
    });

    $(".carousel").replaceWith(curr);


	$("span.adlib").each(function(){
		$(this).replaceWith('<input type="text" class="adlib" style="color:white;" placeholder="'+this.innerText+'"></input>')
	});


	$("span.official").each(function(){
		this.innerText = template.lastName
	});


	var submit = $('<button style="color:white;float: right;" class="btn btn-primary">Submit</button>');

	$("#use_template_button").replaceWith(submit);

	submit.click(function(){

		if(template.medium == 'letter'){
			var address = template//.address
			alert("The address to mail to is: "+address+".  Good luck!")
		}
		else{
			var number = template//.phoneNumbers[0]
			alert("The number to call is: "+number+".  Good luck!")
		}
	})
});

$("#create_template_button").click(function(){
	console.log($(".jumbotron"))
	var overlay = $('<div id="edit_box" contenteditable="true" style="width:100%;height:100%;"></div>')
	overlay.insertAfter($(".jumbotron"))
});
