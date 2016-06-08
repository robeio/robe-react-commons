import cookie from "react-cookie";

/**
 * A singleton class which implements mostly used cookie operations.
 */
class Cookies {

    /**
     *
     * @param name
     * @param value
     * @param days
     * @private
     */
    __createCookie = (name: string, value: string, days: number) => {
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    };
    /**
     *
     * @param name
     * @private
     */
    __eraseCookie = (name) => {
        this.__createCookie(name, "", -1);
    };
    /**
     *
     */
    clearAll = () => {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            console.log(cookies[i]);
            this.__eraseCookie(cookies[i].split("=")[0]);
        }

    };

    /**
     *
     * @param name
     */
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

    /**
     *
     * @param name
     * @param value
     * @param options
     */
    put = (name, value, options) => {
        cookie.save(name, value, options);
    };


    /**
     *
     * @param name
     * @param defaultVal
     * @returns {*}
     */
    get = (name, defaultVal) => {
        var value = cookie.load(name);
        if (value == undefined)
            return defaultVal;
        return value
    }


}

export default new Cookies();