/**
 * Remove the error message and styling if the input has changed
 */
$(document).ready(function() {
    $('.form-group input').on("change", function (event) {
        $(event.target).parent().removeClass("has-error").find('.help-block').hide();
    });
});