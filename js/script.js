function removeActiveBtnClass(){
    var c = $.mobile.activeBtnClass;
    setTimeout(function(){$( '.' + c ).removeClass(c)} , 150);
}

/* panels */
$( document ).on( "pagecreate", "[data-role='page']", function() {
    $( document ).on( "swipeleft swiperight", "[data-role='page']", function( e ) {
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
                closePanel( "sidebar-left" );
                openPanel( "sidebar-right" );
            } else if ( e.type === "swiperight" ) {
                openPanel( "sidebar-left" );
                closePanel( "sidebar-right" );
            }
        }
    });
});

function openPanel(id){
	$('.' + $.mobile.activePageClass + ' #' + id ).panel( "open" );
	removeActiveBtnClass();
}

function closePanel(id){
	$('.' + $.mobile.activePageClass + ' #' + id ).panel( "close" );
	removeActiveBtnClass();
}

function togglePanel(id){
	$('.' + $.mobile.activePageClass + ' #' + id ).panel( "toggle" );
	removeActiveBtnClass();
}


$( window ).on( "resize", function(){
	if( $( window ).width() > 768 ) openPanel( "sidebar-left" ); else closePanel( "sidebar-left" );
});


function contactus() {

    console.log("bahri");

}