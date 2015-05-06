/**
 * Opens the menu and starts the animations
 */
$(document).ready(function(){
    $("a.hamburger-icon").on('click', function(){
        $(this).toggleClass("open");
        $('.content-area .mainmenu').toggleClass("open").attr("style", "");
        $('.content-area .content').toggleClass("open").attr("style", "");
    });
});
/**
 * Flips the caret on the right side of the menu by adding an extra style
 */
$(document).ready(function() {

    $("span[data-toggle=collapse]").on('click', function (event) {

        // Add the collapsed class to the caret
        $(this).children('i.fa').toggleClass('collapsed');

        // Fire the bootstrap collapse manually
        var collapse_target = $(this).attr('data-target');
        $(this).parent('li').children(collapse_target).collapse('toggle');

        // Make sure the parent elements don't receive the click
        event.stopPropagation();

        // But if the span contains a link, do send it onward
        $(this).children('a').click();
    });

});
/**
 * Makes the profile smaller or bigger depending on the scroll position
 */
$(document).ready(function(){
    var profile_element = $('.topbar .profile');
    var toggleBigAvatar = function(){
        profile_element.toggleClass('big').addClass('disable-scroll');
    };

    // Open the big profile picture on mobile
    var mobile_screen_width = 768;
    if( window.innerWidth <= mobile_screen_width ){
        profile_element.addClass('big');
    }


    $(window).on('scroll', function( event ){
        if( $(window).scrollTop() > 10 ){
            if( profile_element.hasClass('disable-scroll') == false ){
                profile_element.removeClass('big').addClass('disable-scroll');
            }
        }
    });

    profile_element.on('click', toggleBigAvatar);
});