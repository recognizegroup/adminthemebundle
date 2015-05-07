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