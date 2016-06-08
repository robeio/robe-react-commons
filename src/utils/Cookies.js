import cookie from "react-cookie";

/**
 * A singleton class which implements mostly used cookie operations.
 */
class Cookies {

    /**
     * Creates new cookie by set name and value with expire day.
     * @param {string} name Cookie name
     * @param {string} value Cookie value
     * @param {number} days Number of days to live
     * @private
     */
    __createCookie(name: string, value: string, days: number) {
        let expires;
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toGMTString()}`;
        } else {
            expires = "";
        }
        document.cookie = `${name}=${value + expires}; path=/`;
    }
    /**
     *  Deletes cookie by name.
     *
     *  @param {string} name Cookie name
     *  @private
     */
    __deleteCookie(name: string) {
        this.__createCookie(name, "", -1);
    }

    /**
     *  Clears all the flat pathed cookies.
     *
     *  @public
     */
    clearAll() {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            this.__deleteCookie(cookies[i].split("=")[0]);
        }
    }

    /**
     * Remove cookie by name.
     *
     * @param {string} name Cookie name
     * @private
     */
    remove = (name: string) => {
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
        cookie.remove(name);
    };

    /**
     * Put a cookie with the given name, value and options.
     *
     * @param {string} name Cookie name
     * @param {any} value Cookie value
     * @param {Object} options Cookie options
     */
    put = (name: string, value: any, options: Object) => {
        cookie.save(name, value, options);
    };

    /**
     * Gets the value of the cookie with the given name.
     * Returns default value in case of no match.
     *
     * @param {string} name Cookie name.
     * @param defaultValue {any} Fallback value in case of no match.
     */
    get = (name: string, defaultValue: string): string => {
        const value = cookie.load(name);
        if (value === undefined) {
            return defaultValue;
        }
        return value;
    }
}

export default new Cookies();
