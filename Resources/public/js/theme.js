/**
 * Opens the menu and starts the animations
 */
$(document).ready(function(){
    $("a.hamburger-icon").on('click', function(){
        $(this).toggleClass("open");
        $('.mainmenu').toggleClass("open");
        $('.content').toggleClass("open");
    });
});