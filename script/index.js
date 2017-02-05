
$("#zip_input").keyup(function() {
    if (this.value.length == 5 && !isNaN(this.value)) {
        $("#zip_submit i").css('color','SteelBlue');
    }else{
        $("#zip_submit i").css('color','#292b2c');
    }
});
