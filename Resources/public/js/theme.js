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

    var menulinks = $(".mainmenu li span:has(a)");

    menulinks.on('click', function (event) {

        console.log( event.target );

        // Add the collapsed class to the caret
        if( event.target.tagName.toLowerCase() === 'span') {
            $( event.target ).children('a')[0].click();
        } else {
            $( event.target ).children('i.fa').toggleClass('collapsed');
        }

    });

    var focuslinks = $(".mainmenu span a");
    focuslinks.on('focus', function (event) {
        $(this).parent('span').addClass("focussed");
    });

    focuslinks.on('blur', function (event) {
        $(this).parent('span').removeClass("focussed");
    });
});
/**
 * Hides the top bar when an inputfield gains focus on mobile devices
 */
$(document).ready(function() {


    if( $(window).width() <= 768 ){
        var startheight = $(window).height();
        var currentwidth = window.innerWidth;

        $(window).on("resize", function( event ){

            // Make sure having there has to be a big enough difference in the resizing
            // So that we know it was the keyboard, and not something else
            if( Math.abs( $(window).height() - startheight) > 100 ){

                // We need to make sure orientation changes don't trigger the hiding of the topbar
                // So we have to keep track of width changes
                if( $(window).height() < startheight && currentwidth == window.innerWidth ){
                    $('.topbar').css('top', '-50px');
                } else {
                    $('.topbar').css('top', '0px');
                }
            }

            if( currentwidth == window.innerWidth ){
                startheight = $(window).height();
            }

            currentwidth = window.innerWidth;
        });
    }

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

        $(window).on('scroll', function( event ){
            if( $(window).scrollTop() > 10 ){
                if( profile_element.hasClass('disable-scroll') == false ){
                    profile_element.removeClass('big').addClass('disable-scroll');
                }
            }
        });

        $(window).on('resize', function( event ){
            profile_element.removeClass('big').addClass('disable-scroll');
        });
    }

    profile_element.on('click', toggleBigAvatar);
});
/**
 * Trigger a faux active state when the enter key is pressed on a btn element
 */
$(document).ready(function() {

    // Trigger click events when the enter button is pressed on a tabfocus element
    var tabenterable = $('a.tabfocus');
    tabenterable.keyup(function( event ){

        // ENTER
        if (event.keyCode == 13) {
            $( event.target).click();
        }
    });

    var buttonelements = $(".btn");
    buttonelements.keydown(function (event) {

        // ENTER
        if (event.keyCode == 13) {

            // Prevent the action from being triggered immediately
            event.preventDefault();
            $( event.currentTarget ).addClass('active');
        }
    });

    buttonelements.keyup(function (event) {

        // ENTER
        if (event.keyCode == 13) {
            $( event.currentTarget ).removeClass('active');

            // Trigger the prevented default of the element
            $( event.currentTarget).trigger('click');
        }
    });

});