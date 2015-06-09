/**
 * Remove the error message and styling if the input has changed
 */
$(document).ready(function() {
    $('.has-error input').on("change", function (event) {
        $( event.target ).parents(".has-error").removeClass("has-error").find('.help-block').hide();
    });
});