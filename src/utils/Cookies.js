import cookie from "react-cookie";

class Cookies {

    __createCookie = (name, value, days) => {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    };
    __eraseCookie = (name) => {
        this.__createCookie(name, "", -1);
    };
    clearAll = () => {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            console.log(cookies[i]);
            this.__eraseCookie(cookies[i].split("=")[0]);
        }

    };

    remove = (name) => {
        cookie.remove(name, {
            "domain": window.location.hostname,
            "path": "/"
        });
        cookie.remove(name, {
            "domain": "." + window.location.hostname,
            "path": "/"
        });

        var path = window.location.pathname;
        path = path.substring(0, path.length - 1);
        console.log(name, window.location.hostname, path);
        cookie.remove(name, {
            "domain": window.location.hostname,
            "path": path
        });
        cookie.remove(name, {
            "domain": "." + window.location.hostname,
            "path": path
        });
    };

    put = (name, value, options) => {
        cookie.save(name, value, options);
    };


    get = (name, defaultVal) => {
        var value = cookie.load(name);
        if (value == undefined)
            return defaultVal;
        return value
    }


}

module.exports = new Cookies();