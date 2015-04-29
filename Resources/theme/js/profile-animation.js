/**
 * Makes the profile smaller or bigger depending on the scroll position
 */
$(document).ready(function(){
    var profile_element = $('.topbar .profile');
    var toggleBigAvatar = function(){
        profile_element.toggleClass('big').addClass('disable-scroll');
    };

    var mobile_screen_width = 768;
    if( window.innerWidth <= mobile_screen_width ){
        profile_element.addClass('big');
    }


    $(window).on('scroll', function( event ){
        if( $(window).scrollTop() > 50 ){
            if( profile_element.hasClass('disable-scroll') == false ){
                profile_element.removeClass('big').addClass('disable-scroll');
            }
        }
    });

    profile_element.on('click', toggleBigAvatar);
});