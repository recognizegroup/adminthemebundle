/**
 * Makes the menu slide out on touch
 *
$(document).ready(function(){
    var is_sliding = false;
    var sliding_lastoffset = 0;
    var menu = {
        lowerbounds: -250,
        higherbounds: 0,
        element: $('.content-area .mainmenu')
    };

    var content = {
        lowerbounds: 0,
        higherbounds: 250,
        element: $('.content-area .content')
    };

    var left = -250;
    var hamburgericon = $('a.hamburger-icon');

    $('.content-area').on('touchmove', function( event ){
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

            var content_sliding = function( offset ){
                if( offset < content.lowerbounds ){
                    offset = content.lowerbounds;
                } else if( offset > content.higherbounds ) {
                    offset = content.higherbounds;
                }

                content.element.css('left', offset + 'px' );
            };

            if( sliding_lastoffset !== false ){
                var positionchange = ( event.offsetX - sliding_lastoffset ) / 2 * 4;
                left = positionchange;
                menu_sliding( positionchange );
                content_sliding( positionchange + 250 );
            }

        }
    }).on('touchstart', function( event ){

        // Only slide open if the mouse is close to the left edge of the screen
        if( event.offsetX < 250 ){
            is_sliding = true;
            sliding_lastoffset = event.offsetX;
        }

    }).on('touchend',function(){

        // Bounce back into closed state
        if( left < menu.lowerbounds / 1.5 ){
            left = menu.higherbounds;
            hamburgericon.removeClass('open');
            menu.element.removeClass('open').attr("style", "");
            content.element.removeClass('open').attr("style", "");

        // Bounce into opened state
        } else {
            left = menu.higherbounds;
            hamburgericon.addClass('open');
            menu.element.addClass('open').attr("style", "");
            content.element.addClass('open').attr("style", "");
        }

        is_sliding = false;
    });
});*/