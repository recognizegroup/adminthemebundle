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