/* vars */
var ua, iphone, android, androidOld, win, mozilla, lastHash, swift;

ua = navigator.userAgent;
iphone = ua.match(/(iPhone|iPod|iPad)/) != null;
android = ua.match(/Android/) != null;
mozilla = ua.match(/Mozilla/) != null;    
androidOld = /android 2\.3/i.test(ua);
win = $(window);
lastHash = window.location;

if (window.webkit != null) {
    swift = true;
} else {
    swift = false;
}

function getVersion() {
    var version = 0;
    if (android) {
        if (typeof JSInterface.getVersion == 'function') { 
            version = JSInterface.getVersion();       
        }
    }
    if (iphone) {
        //sendBridge({"method":"trackPageView", "page":page});
    }
    
    return version;
}

function feedsURL(url) {

    if (android) {
        if (typeof JSInterface.openBrowser == 'function') {
            JSInterface.openBrowser(url);
        }
        else if (typeof JSInterface.myBrowser == 'function') {
            JSInterface.myBrowser(url);
        }
    }
    else if (iphone && !swift) {
        sendBridge({ "method": "feedsURL", "url": url });
    } else if (iphone && swift) {
        window.webkit.messageHandlers.iOScallbackHandler.postMessage({ "method": "feedsURL", "url": url });
    }

    if (!android && !iphone) {
        window.parent.showAlert("Önizleme ekranında bu özellik çalışmamaktadır.");
    }
}

function showDialog(alertMessage) {
    if (android) {
        if (typeof JSInterface.showDialog == 'function') {
            JSInterface.showDialog(alertMessage);
        }        
    }
    if (iphone && !swift) {
        sendBridge({ "method": "showDialog", "message": alertMessage });
    } else if (iphone && swift) {
        window.webkit.messageHandlers.iOScallbackHandler.postMessage({ "method": "showDialog", "message": alertMessage });
    }
    
}

function closeDialog() {
    if (android) {
        if (typeof JSInterface.closeDialog == 'function') {
            JSInterface.closeDialog();
        }   
    }
    if (iphone && !swift) {
        sendBridge({ "method": "closeDialog" });
    } else if (iphone && swift) {
        window.webkit.messageHandlers.iOScallbackHandler.postMessage({ "method": "closeDialog" });
    }
    if (remoteDebug) {
        console.log("closeDialog");
    }
}

var flag = false;

$(document).on('pagebeforechange', function () {
    if (flag == false) {
        showDialog('Yükleniyor...');
        flag = true;
    }
});

$(document).on('pageshow', function () {
    closeDialog();
    flag = false;
}); 


