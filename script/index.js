
$("#zip_input").keyup(function() {
    if (this.value.length == 5 && !isNaN(this.value)) {
        $("#zip_submit i").css('color','SteelBlue');
        $("#zip_submit i").wrap( "<a href='representatives.html'></a>");
    }else{
        $("#zip_submit a").removeAttr("href");
        $("#zip_submit i").css('color','#292b2c');
    }
});
