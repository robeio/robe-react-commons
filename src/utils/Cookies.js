import cookie from "react-cookie";

/**
 * A singleton class which implements mostly used cookie operations.
 *  @desciption Manages the keeps cookies in the browser
 *
 */
class Cookies {

    /**
     * @description creates new cookie by set name and value with expire day.
     *
     * @param name {string} describes cookie name
     * @param value {string} describes cookie value
     * @param days expire days
     * @private
     */
    __createCookie = (name: string, value: string, days: number) => {
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
     *  @description deletes cookie by name
     *
     *  @param name {string} describes cookie name
     *  @private
     */
    __eraseCookie = (name : string) => {
        this.__createCookie(name, "", -1);
    };

    /**
     *  @description deletes all cookies.
     *
     *  @public
     */
    clearAll = () => {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            this.__eraseCookie(cookies[i].split("=")[0]);
        }
    };

    /**
     * @description remove cookie by name.
     *
     * @param name {string} describes cookie name
     * @private
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
     * @description puts new param by set name and value .
     *
     * @param name {string} describes cookie name
     * @param value {any} describes cookie value
     * @param options {Object} describes cookie options
     */
    put = (name : string, value : any, options : Object) => {
        cookie.save(name, value, options);
    };

    /**
     * @description get value by name. Returns default value if parameter is not exist .
     *
     * @param name {string} describes cookie name
     * @param defaultVal {any} describes cookie value
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
