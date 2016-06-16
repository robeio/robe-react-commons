import IsJS from "is-js";
/**
 * A singleton class which implements mostly used validation operations.
 */

class Assertions {

    /**
     * url pattern explaining
     * "^(https?:\/\/)?"+ // protocol
     * "((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|"+ // domain name
     * "((\d{1,3}\.){3}\d{1,3}))"+ // OR ip (v4) address
     * "(\:\d+)?(\/[-a-z\d%_.~+]*)*"+ // port and path
     * "(\?[;&a-z\d%_.~+=-]*)?"+ // query string
     * "(\#[-a-z\d_]*)?$","i"); // fragment locater
     *
     * check if the string is url then
     * @type {RegExp}
     */
    constructor() {
        this.urlPattern = /([a-z]+:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ #]*)#?([^ #]*)/g;
    }

    /**
     * Removes the given item from the given array.
     * @param {Array} source Source array for the remove operation. *This array will be modified at the end of the operation.*
     * @param {any} target Target to match.
     * @returns {boolean} "true": target removed , "false": target not found.
     */
    isUrl(url: String, error: boolean): boolean {
        if (!this.urlPattern.test(url)) {
            if (error) {
                throw new Error(`Given url is not valid ! URL :${url}`);
            }
            return false;
        }
        return true;
    }

    /**
     * Check is Empty or not
     * @param arg
     * @returns {*|{name, pass}|boolean}
     */
    isNotEmpty(arg: any, error: boolean): boolean {
        if (IsJS.empty(arg)) {
            if (error) {
                throw new Error("Given argument is empty or null !");
            }
            return false;
        }
        return true;
    }

    isNotUndefined(arg: any, error: boolean): boolean {
        if (arg === undefined) {
            if (error) {
                throw new Error("Given argument is undefined !");
            }
            return false;
        }
        return true;
    }

}

export default new Assertions();
