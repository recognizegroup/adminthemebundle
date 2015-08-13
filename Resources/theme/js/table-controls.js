/**
 * Search, sorting and pagination controls
 */
$(document).ready( function(){

    /**
     * Submit the search when the enter key is pressed
     */
    $('.search-container input[type="search"]').on("keypress", function(event){
        if( event.keyCode == 13 ){
            this.form.submit();
        }
    });

    $('.search-toggle').on("click", function( event ){
        var container = $( this ).siblings(".search-container").eq(0);

        container.toggleClass('open');
        if( container.hasClass("open")){
            container.children("input").focus();
        } else {
            container.children("input").blur();
        }

        // Toggle to open and close icon
        $( this).children("i").toggleClass('fa-close')
            .toggleClass('fa-search');

        // Clear the value on close and submit
        if( $( this).children("i").hasClass("fa-search") ){
            if( container.children("input").val() != "" ){
                container.children("input").val( "" );
                container.children("input").get(0).form.submit();
            }
        }
    });

    // Toggle the icon
    $('.sorting_button').on("change", function(){
        var icon = $( this).siblings("i").eq(0);

        if( icon.hasClass("fa-sort") ){
            icon.toggleClass("fa-sort").addClass("fa-sort-down");

        } else if ( icon.hasClass("fa-sort-down") ){
            icon.toggleClass("fa-sort-down").addClass("fa-sort-up");

        } else if ( icon.hasClass("fa-sort-up") ){
            icon.toggleClass("fa-sort-up").addClass("fa-sort");
        }

        this.form.submit();
    });

});
