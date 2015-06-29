$(document).ready(function() {
    //functions go here
    $('#blue').hover( function() {
        $( '#container' ).css({"display": "block"});
    }, function() {
        $( '#container' ).css({"display": "none"});
    }
);

    // this works, so if anything breaks just refer back to this code
    // $('#orange').hover( function() {
    //     $( this ).css({"background-color": "blue"});
    // }, function() {
    //     $( this ).css({"background-color": "green"});
    // }



});
