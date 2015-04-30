/**
 * Makes the topbar slide up when the user scrolls down, and makes the topbar slide back down if the user scrolls up
 */
$(document).ready(function(){
    // Only move the topbar out of the way on a mobile screen
    var mobile_screen_width = 768;
    if( window.innerWidth <= mobile_screen_width ){
        var topbar = $('.topbar');

        var latestscrollpos = window.scrollY;
        $(window).on('scroll', function( event ){
            var currentscrollpos = window.scrollY;

            // Make sure the topbar doesn't disappear if the menu is open
            if( $('.content-area .mainmenu').hasClass('open') == false ){
                if( latestscrollpos < currentscrollpos ){
                    topbar.addClass('animation-topbar-up');
                } else {
                    topbar.removeClass('animation-topbar-up');
                }
            }

            latestscrollpos = currentscrollpos;
        });
    }
});