
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


k = function() {

	var curr = $(".carousel-item.active")
	var html = curr[0].innerHTML

	var temp = jQuery.data(curr,"template")
	console.log(temp)

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
		this.innerText = temp.lastName
	});


	var submit = $('<button style="color:white;float: right;" class="btn btn-primary">Submit</button>');

	$("#use_this_button").replaceWith(submit);

	submit.click(function(){

		if(temp.medium == 'letter'){
			var address = temp.addresses[0]
			alert("The address to mail to is: "+address+".  Good luck!")
		}
		else{
			var number = temp.phoneNumbers[0]
			alert("The number to call is: "+number+".  Good luck!")
		}
	})
};
		

console.log(params)

httpQueryTemplates(params.issue,(params.medium == 'call') ? 'phone' : 'letter',function(resp) {
	console.log("here")
	console.log(resp)
    var templates = JSON.parse(resp);

    if(templates.length > 0){
	    console.log(templates)

	    $(".carousel-item").hide()
		$(".carousel-item").remove()
		$(".carousel-item").show()
	    
	    templates.forEach(function(item){
	    	console.log("for each")
	    	var test = $('<div class="carousel-item"><div class="card" style="width: 1000px; padding: 25px 200px"><div class="card-block"><p class="card-text">'+item.text+'<a href="#" class="btn btn-primary" id="use_this_button" style="float: right">use this!</a></p></div></div></div>')
	    	console.log(test)
	    	$("#inner_carousel").append(test)
	    	$("#use_this_button").click(k);
	    	jQuery.data(test, "template", item );
	    	
	    	//$(".carousel-inner").append(test)
	    });
	    $($(".carousel-item")[0]).addClass('active')
	    $(".card-block").css('width','600px')

	}
	else{
	}

})




$("#create_template_button").click(function(){
	console.log($(".jumbotron"))
	var overlay = $('<div id="edit_box" contenteditable="true" style="width:100%;height:100%;"></div>')
	overlay.insertAfter($(".jumbotron"))
});
