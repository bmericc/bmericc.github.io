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

/* trigger resize */
$( document ).on( "pageshow ", function() {
    $( window ).trigger( "resize" );
});

$( window ).on( "resize", function(){
    if( $( window ).width() > 768 ) openPanel( "sidebar-left" ); else closePanel( "sidebar-left" );
});


function contactus() {

     $.ajax({url: 'https://secure.prj.be/contactus/',
        data: { outputType:'json', form : $('#contactusForm').serialize()},
        type: 'post',                   
        async: 'true',
        dataType:"json",
        beforeSend: function() {
             $.mobile.loading( "show" ); // This will show ajax spinner
        },
        complete: function() {
             $.mobile.loading( "hide" ); // This will hide ajax spinner
        },
        success: function (result) {
            if(result.status) {
                if($("#formAlert").length == 0){
                    $('#contactusForm').prepend("<p id='formAlert'>Mesajınız iletildi. <br/>İlginiz için teşekkür ederim</p>");     
                    $("#formAlert").delay(1000).hide();      
                }    
                else {
                    $("#formAlert").show();
                    $('#formAlert').html("Mesajınız iletildi. <br/>İlginiz için teşekkür ederim");
                    $("#formAlert").delay(1000).hide();      
                }                
            } else {                            
                if($("#formAlert").length == 0){   
                    $('#contactusForm').prepend("<p id='formAlert'>"+result.message+"</p>"); 
                    $("#formAlert").delay(1000).hide();      
                }
                else {
                    $("#formAlert").show();
                    $('#formAlert').html(result.message);
                    $("#formAlert").delay(1000).hide();      
                }
            }
        },
        error: function (request,error) {          
            if($("#formAlert").length == 0){       
                $('#contactusForm').prepend("<p id='formAlert'>Sunucu ile iletişim hatası oluştu. Lütfen daha sonra tekrar deneyin!</p>");
                $("#formAlert").delay(1000).hide();      
            }
            else {
                $("#formAlert").show();
                $('#formAlert').html("Network error has occurred please try again!");
                $("#formAlert").delay(1000).hide();      
            }
        }
    });                   

}