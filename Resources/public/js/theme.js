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
/**
 * Makes the menu slide out on touch
 */
$(document).ready(function(){
    var is_sliding = false;
    var sliding_lastoffset = 0;
    var menu = {
        lowerbounds: -250,
        higherbounds: 0,
        element: $('.content-area .leftmenu')
    };

    var left = -250;
    var hamburgericon = $('a.hamburger-icon');

    var title = $('.content');
    $('.content-area').on('scroll', function( event ){
        title.html("<p>left " + event.offsetX + "</p>" );

        if( is_sliding ){
            menu.element.addClass('noselect');
            content.element.addClass('noselect');

            var menu_sliding = function( offset ){
                if( offset < menu.lowerbounds ){
                    offset = menu.lowerbounds;
                } else if( offset > menu.higherbounds ) {
                    offset = menu.higherbounds;
                }

                menu.element.css('left', offset + 'px' );
            };

            if( sliding_lastoffset !== false ){
                var positionchange = ( event.offsetX - sliding_lastoffset );
                left = positionchange;
                menu_sliding( positionchange );
            }

        }
    }).on('touchstart', function( event ){

        // Only slide open if the mouse is close to the left edge of the screen
        is_sliding = true;
        sliding_lastoffset = event.originalEvent.touches[0].pageX;


    }).on('touchend',function(){

        // Bounce back into closed state
        if( left < menu.lowerbounds / 1.5 ){
            left = menu.higherbounds;
            hamburgericon.removeClass('open');
            menu.element.removeClass('open').attr("style", "");

        // Bounce into opened state
        } else {
            left = menu.higherbounds;
            hamburgericon.addClass('open');
            menu.element.addClass('open').attr("style", "");
        }

        is_sliding = false;
    });
});