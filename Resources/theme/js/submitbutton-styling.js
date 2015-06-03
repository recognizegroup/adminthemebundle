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