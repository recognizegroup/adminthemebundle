/**
 * Flips the caret on the right side of the menu by adding an extra style
 */
$(document).ready(function() {

    var menulinks = $(".mainmenu span a");

    menulinks.on('click', function (event) {

        // Add the collapsed class to the caret
        $(this).children('i.fa').toggleClass('collapsed');
        $(this).children('a').children('i.fa').toggleClass('collapsed');

    });

    menulinks.on('focus', function (event) {
        $(this).parent('span').addClass("focussed");
    });

    menulinks.on('blur', function (event) {
        $(this).parent('span').removeClass("focussed");
    });
});