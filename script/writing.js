
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

var input = decodeURI(location.href.substr(location.href.indexOf("?")+1));

var params = {};
input.split('&').forEach(function(item){
    var pair = item.split('=');
    params[pair[0]] = pair[1];
});


var template = {};

console.log(params)

httpQueryTemplates(params.issue,params.medium,function(resp) {
	console.log("here")
	console.log(resp)
    var templates = JSON.parse(resp);

    if(templates.length > 0){
	    console.log(templates)
	    
	    templates.forEach(function(item){
	    	console.log("for each")
	    	var test = $('<div class="carousel-item"><div class="card" style="width: 720px; padding: 25px 200px"><img class="card-img-top" src="..." alt="Card image cap"><div class="card-block"><h4 class="card-title">Card title</h4><p class="card-text">'+item.text+'</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>')
	    	console.log(test)
	    	$("#inner_carousel").append(test)
	    	//$(".carousel-inner").append(test)
	    });
	    $($(".carousel-item")[0]).addClass('active')
	}
	else{

		var item = {}
		item.text = 'Hello, <span class="official"></span> office. This is <span class="adlib">Your Name</span> and I\'d like to speak to the staffer who works on healthcare.[If necessary wait for the correct person to be put on the line] I am calling about the recent overhaul to Medicare by the current administration. As one of your many constituents who currently receives their health insurance from Medicare, I would like to ensure that <span class="official"></span> makes sure that I am covered in the future. Furthermore, I would like to know whether or not <span class="official"></span> plans to make a public stand on this issue.[Respond to any further questions they may have]. yes, please express to <span class="official"></span> that the executive order doesn\'t respresent our values, and that I am asking him/her to take a principled public stand against this kind of intolerancce. Thanks for your time. <span class="adlib">your name</span> Thank you.';
    	var test = $('<div class="carousel-item"><div class="card" style="width: 720px; padding: 25px 200px"><img class="card-img-top" src="..." alt="Card image cap"><div class="card-block"><h4 class="card-title">Card title</h4><p class="card-text">'+item.text+'</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>')
    	console.log(test)
    	$("#inner_carousel").append(test)
    	//$(".carousel-inner").append(test)

	    $($(".carousel-item")[0]).addClass('active')
	}


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
