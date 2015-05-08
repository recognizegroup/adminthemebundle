/**
 * Make keyboard navigation possible on tables
 *
$(document).ready(function() {
    var table = $('.table-keyboard-nav');
    var header = table.find("thead");

    var headerindex = 0;
    var addHorizontalEvents = function( headerelement ){
        headerelement.on("keydown", function( event ){

            var headerelements = $( event.target ).children("tr").children("th");

            // LEFT
            if( event.keyCode == 37 ){

                headerindex--;
                if( headerindex < 0 ){
                    headerindex = 0;
                }

                headerelements.removeClass("focussed");
                headerelements.eq(headerindex).addClass("focussed");

            // RIGHT
            } else if ( event.keyCode == 39 ){

                headerindex++;
                var headerlength = headerelements.length
                if( headerindex >= headerlength ){
                    headerindex = headerlength - 1;
                }

                headerelements.removeClass("focussed");
                headerelements.eq(headerindex).addClass("focussed");

            // ENTER
            } else if ( event.keyCode == 13 ){
                headerelements.eq(headerindex).trigger('click');
            }
        });
    };


    header.on("focus", function( event ){
        addHorizontalEvents( $( event.target) );
        $( event.target ).children("tr").children("th").eq(0).addClass("focussed");
    }).on("blur", function( event ){

        $( event.target).off("keydown");
        $( event.target ).children("tr").children("th").removeClass("focussed");
    });
});*/