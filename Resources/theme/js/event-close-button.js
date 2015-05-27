/**
 * Remove an event that is on top of the content
 */
$(document).ready(function() {
    $('.close-alert').on("click", function (event) {
        $(event.target).parent().hide();
    });
});