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