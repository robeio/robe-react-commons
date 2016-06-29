import IsJS from "is-js";
/**
 * A singleton class which implements mostly used validation operations.
 */

class Assertions {

    __checkerObject = {};
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
        this.urlPattern = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
    }

    /**
     * Checks if the string is a valid URL.
     * @param {String} url string to check.
     * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
     * @returns {boolean} "true": is url , "false": is not url.
     * @throws exception if error is true and url provided is not valid.
     */
    isUrl(url: String, error: boolean): boolean {
        console.log(url, this.urlPattern.test(url));
        if (!this.urlPattern.test(url)) {
            if (error) {
                throw new Error(`Given url is not valid ! URL :${url}`);
            }
            return false;
        }
        return true;
    }

    /**
     * Checks is Empty or not
     * @param {any} object to check
     * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
     * @returns {boolean} "true": is not empty , "false": is empty.
     * @throws exception if error is true and object provided is  empty.
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


    /**
     * Checks is not undefined
     * @param {any} object to check
     * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
     * @returns {boolean} "true": is not undefined , "false": is undefined.
     * @throws exception if error is true and object provided is  undefined.
     */
    isNotUndefined(arg: any, error: boolean): boolean {
        if (arg === undefined) {
            if (error) {
                throw new Error("Given argument is undefined !");
            }
            return false;
        }
        return true;
    }

    /**
     * Checks the func is Function
     * @param func
     * @param error
     * @returns {boolean}
     */
    isFunction = (func: Function, error: boolean): boolean => {
        if (this.isNotUndefined(func, error)) {
            let isFunc = this.__checkerObject.toString.call(func) === "[object Function]";
            if (!isFunc) {
                if (error) {
                    throw new Error("Given func is not a function !");
                }
                return false;
            }
            return true;
        }
        return false;
    }

    /**
     * Checks func is not Anonymous function ( if function has no name then it is anonymous)
     * @param func
     * @param error
     * @returns {boolean}
     */
    isNotAnonymous(func: Function, error: boolean): boolean {
        if (this.isFunction(func, error)) {
            if (!this.isNotUndefined(func.name)) {
                if (error) {
                    throw new Error("Given argument is a anonymous function !");
                }
                return false;
            }
            return true;
        }
        return false;
    }

    /**
     * Checks obj is Object
     * @param obj
     * @param error
     * @returns {boolean}
     */
    isObject(obj: Object, error: boolean): boolean {
        if (!IsJS.object(obj)) {
            if (error) {
                throw new Error("Given argument is undefined !");
            }
            return false;
        }
        return true;
    }
}

export default new Assertions();
