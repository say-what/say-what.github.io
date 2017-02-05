
$("#zip_input").keyup(function() {
    if (this.value.length == 5 && !isNaN(this.value)) {
        $("#zip_submit i").css('color','SteelBlue');
        $("#zip_submit i").wrap( "<a href='contacting.html'></a>");
        $(".nav-item:nth-of-type(2) a").removeClass('disabled');
    }else{
        $("#zip_submit a").removeAttr("href");
        $("#zip_submit i").css('color','Gainsboro');
        $(".nav-item:nth-of-type(2) a").addClass('disabled');
    }
});
