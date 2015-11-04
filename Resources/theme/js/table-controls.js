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
        var inparent = false;
        var container = $( this ).siblings(".search-container").eq(0);

        // If the toggle is in the parent itself,
        if( container.length == 0 ){
            inparent = true;
            container = $( this ).parent(".search-container").eq(0);
        }

        var th = container.parents("th");
        var thwidth = th.innerWidth();
        container.toggleClass('open');
        if( container.hasClass("open")){

            // Make sure there is enough room for the search input field
            if( window.outerWidth > 768 ){
                if( th.outerWidth() < 220 ){
                    th.css("min-width", "220px");
                } else {
                    th.css("width", thwidth + "px" );
                }
            }
            container.children("input").focus();
        } else {
            container.children("input").blur();
        }

        // Toggle to open and close icon
        if( inparent == false ){
            $( this).children("i").toggleClass('fa-close')
                .toggleClass('fa-search');

            // Clear the value on close and submit
            if( $( this).children("i").hasClass("fa-search") ){
                if( container.children("input").val() != "" ){
                    container.children("input").val( "" );
                    container.children("input").get(0).form.submit();
                }
            }
        } else {
            container.siblings("a").children("i").removeClass("fa-close")
                .addClass("fa-search");
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


    // Make table rows linkable if they have a data-href element on them
    $('.custom-table [data-href]').css('cursor', 'pointer').on('click', function( evt ){
        window.location = $( evt.currentTarget ).data("href");

        // Add styling on interaction
    }).on("mousedown", function( evt ){
        $( evt.currentTarget ).addClass('active')
            .on("mouseenter", function( event ) {
                $( event.currentTarget).addClass("active");
            })
            .on("mouseleave", function( event ){
                $( event.currentTarget).removeClass("active").off("mouseleave", "mouseup");
            })
            .on("mouseup", function( event ) {
                $( event.currentTarget).removeClass("active").addClass("focus").off("mouseleave", "mouseup");
            });
    });
});
