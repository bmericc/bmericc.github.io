/* vars */
var ua, iphone, android, androidOld, win, mozilla, lastHash;

ua = navigator.userAgent;
iphone = ua.match(/(iPhone|iPod|iPad)/) != null;
android = ua.match(/Android/) != null;
mozilla = ua.match(/Mozilla/) != null;    
androidOld = /android 2\.3/i.test(ua);
win = $(window);
lastHash = window.location;

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
    else if (iphone) {
        sendBridge({"method":"feedsURL", "url":url});
    }
    else {
        location.href = url;
    }
    
}
