/**
 * Hides the top bar when an inputfield gains focus on mobile devices
 */
$(document).ready(function() {


    if( $(window).width() <= 768 ){

        var startheight = $(window).height();
        $(window).on("resize", function( event ){
            if( $(window).height() < startheight ){
                $('.topbar').css('top', '-50px');
            } else {
                $('.topbar').css('top', '0px');
            }
        });
    }

});