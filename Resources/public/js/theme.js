/**
 * Remove an event that is on top of the content
 */
$(document).ready(function() {
    $('.close-alert').on("click", function (event) {
        $(event.target).parent().hide();
    });
});
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
 * Fix an issue with Chrome that makes the scrolling to an invalid input field show an arrow to the header bar
 * Instead of the input field.
 *
 * http://stackoverflow.com/questions/19814673/html5-input-required-scroll-to-input-with-fixed-navbar-on-submit
 */
$(document).ready(function() {
    $('input').on('invalid', function (event) {
        setTimeout(function () {
            var offset = 0;
            var parent = $(event.target).parent();
            if (parent.has(".form-group")) {
                offset = parent.position().top;
            }

            if (offset) {
                window.scroll(0, offset);
            }
        }, 2);
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
 * Remove the error message and styling if the input has changed
 */
$(document).ready(function() {
    $('.has-error input').on("change", function (event) {
        $( event.target ).parents(".has-error").removeClass("has-error").find('.help-block').hide();
    });
});
/**
 * Swap the styling of a button with a loading animation on submit
 */
$(document).ready(function() {
    $('form').on("submit", function( event ){
        $( event.target).find('.btn[type=submit]').on("click", function( event ){
            event.preventDefault();
        }).html("<i class=\"fa fa-2x fa-pulse fa-spinner\"></i>");
    });
});
/**
 * Trigger a faux active state when the enter key is pressed on a btn element
 */
$(document).ready(function() {

    // Trigger click events when the enter button is pressed on a tabfocus element
    var tabenterable = $('.tabfocus');
    tabenterable.keyup(function( event ){

        // ENTER
        if (event.keyCode == 13) {
            $( event.target ).click();
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
/**Allow phone

 * Make keyboard navigation possible on tables
 *
$(document).ready(function() {
    var table = $('.table-keyboard-nav');
    var header = table.find("thead");

    var headerindex = 0;
    var addHorizontalEvents = function( headerelement ){
        headerelement.on("keydown", function( event ){

            var headerelements = $( event.target ).children("tr").children("th");

            // LEFT
            if( event.keyCode == 37 ){

                headerindex--;
                if( headerindex < 0 ){
                    headerindex = 0;
                }

                headerelements.removeClass("focussed");
                headerelements.eq(headerindex).addClass("focussed");

            // RIGHT
            } else if ( event.keyCode == 39 ){

                headerindex++;
                var headerlength = headerelements.length
                if( headerindex >= headerlength ){
                    headerindex = headerlength - 1;
                }

                headerelements.removeClass("focussed");
                headerelements.eq(headerindex).addClass("focussed");

            // ENTER
            } else if ( event.keyCode == 13 ){
                headerelements.eq(headerindex).trigger('click');
            }
        });
    };


    header.on("focus", function( event ){
        addHorizontalEvents( $( event.target) );
        $( event.target ).children("tr").children("th").eq(0).addClass("focussed");
    }).on("blur", function( event ){

        $( event.target).off("keydown");
        $( event.target ).children("tr").children("th").removeClass("focussed");
    });
});*/

/**
 * Modal display code, used as confirmation dialog
 */
$(function() {
    $('.display-modal').click(function(e) {
        e.preventDefault(); // Stop default action
        var $target = $(e.currentTarget), $modal = $($target.attr('data-target'));
        $modal.modal('show'); // Display it
        $('a.confirm', $modal).attr('href', $target.attr('href'));
    });

});