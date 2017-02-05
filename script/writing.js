$("#use_template_button").click(function() {

	var template = {};
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
