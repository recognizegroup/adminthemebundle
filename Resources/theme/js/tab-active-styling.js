/**
 * Trigger a faux active state when the enter key is pressed on a btn element
 */
$(document).ready(function() {

    var buttonelements = $(".btn");
    $('body').keyup(function(event){

        // TAB
        if( event.keyCode == 9 ){

            // Reindex all the buttonelements
            buttonelements.unbind("keydown").unbind("keyup");
            buttonelements = $(".btn");

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
        }
    });
});