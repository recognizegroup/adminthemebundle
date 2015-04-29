/**
 * Makes the profile smaller or bigger depending on the scroll position
 */
$(document).ready(function(){

    var profile_element = $('.topbar .profile');
    var toggleBigAvatar = function(){
        profile_element.toggleClass('big').addClass('disable-scroll');
    };

    $(window).on('scroll', function( event ){
        if( $(window).scrollTop() > 50 ){
            if( profile_element.hasClass('disable-scroll') == false ){
                profile_element.removeClass('big');
            }
        }
    });

    profile_element.on('click', toggleBigAvatar);
});