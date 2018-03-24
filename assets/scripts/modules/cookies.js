export function setCookie(name, value, expires) {
    var expiresString = expires ? "expires=" + expires.toUTCString() : "";
    document.cookie = name + "=" + value + ";" + expiresString + ";path=/";
}

export function getCookie(name) {
    var tempName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(tempName) == 0) {
            return c.substring(tempName.length, c.length);
        }
    }
    return "";
}

export function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/";
}
