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