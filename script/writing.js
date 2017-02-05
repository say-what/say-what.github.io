$("#use_template_button").click(function() {
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



	console.log($("span.adlib"))
	$("span.adlib").each(function(){
		$(this).replaceWith('<input type="text" class="adlib" style="color:white;" placeholder="'+this.innerText+'"></input>')
	});


	var submit = $('<button style="color:white;float: right;" class="btn btn-primary">Submit</button>');

	$("#use_template_button").replaceWith(submit);

	submit.click(function(){
		var template = {};
		template.medium = 'call';

		if(template.medium == 'letter'){
			//idfk	
		}
		else{
			var number = template//.phoneNumbers[0]
			alert("The number to call is: "+number+".  Good luck!")
		}
	})
});
