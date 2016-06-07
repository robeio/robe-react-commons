import cookie from "react-cookie";

/**
 *
 */
class Cookies {

    /**
     * @param name
     * @param value
     * @param days
     * @private
     */
    __createCookie = (name : string, value : string, days : number) => {
        let expires;
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toGMTString()}`;
        } else {
            expires = "";
        }
        document.cookie = `${name}=${value + expires}; path=/`;
    };
    /**
     *
     * @param name
     * @private
     */
    __eraseCookie = (name : string) => {
        this.__createCookie(name, "", -1);
    };
    /**
     *
     */
    clearAll = () => {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            this.__eraseCookie(cookies[i].split("=")[0]);
        }
    };

    /**
     *
     * @param name
     */
    remove = (name : string) => {
        cookie.remove(name, {
            domain: window.location.hostname,
            path: "/"
        });
        cookie.remove(name, {
            domain: `.${window.location.hostname}`,
            path: "/"
        });
        let path = window.location.pathname;
        path = path.substring(0, path.length - 1);
        cookie.remove(name, {
            domain: window.location.hostname,
            path
        });
        cookie.remove(name, {
            domain: `.${window.location.hostname}`,
            path
        });
    };

    /**
     *
     * @param name
     * @param value
     * @param options
     */
    put = (name : string, value : any, options : Object) => {
        cookie.save(name, value, options);
    }


    /**
     *
     * @param name
     * @param defaultVal
     * @returns {*}
     */
    get = (name : string, defaultVal : any) : any => {
        const value = cookie.load(name);
        if (value === undefined) {
            return defaultVal;
        }
        return value;
    }
}

export default new Cookies();
