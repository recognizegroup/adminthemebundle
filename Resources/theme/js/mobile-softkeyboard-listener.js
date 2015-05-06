/**
 * Hides the top bar when an inputfield gains focus on mobile devices
 */
$(document).ready(function() {


    if( $(window).width() <= 768 ){
        var startheight = $(window).height();
        var currentwidth = window.innerWidth;

        $(window).on("resize", function( event ){

            // We need to make sure orientation changes don't trigger the hiding of the topbar
            // So we have to keep track of width changes
            if( $(window).height() < startheight && currentwidth == window.innerWidth ){
                $('.topbar').css('top', '-50px');
            } else {
                $('.topbar').css('top', '0px');
            }
            
            if( currentwidth == window.innerWidth ){
                startheight = $(window).height();
            }

            currentwidth = window.innerWidth;
        });
    }

});