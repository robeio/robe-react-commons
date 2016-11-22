import React from "react";
import IsJS from "is-js";

const toString = Object.prototype.toString;
const checkerObject = {};

/**
 * A singleton class which implements mostly used validation operations.
 */

class Assertions {

    checkerObject = {};
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
        this.urlPattern = /^(([a-z]+:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ #]*)#?([^ #]*))|((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))$/;
    }

    /**
     * Checks if the string is a valid URL.
     * @param {String} url string to check.
     * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
     * @returns {boolean} "true": is url , "false": is not url.
     * @throws exception if error is true and url provided is not valid.
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
     * Checks is not undefined or null
     * @param {any} object to check
     * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
     * @returns {boolean} "true": is not undefined and null , "false": is undefined or null.
     * @throws exception if error is true and object provided is  undefined or null.
     */
    isNotUndefinedAndNull(arg: any, error: boolean): boolean {
        if (arg === undefined) {
            if (error) {
                throw new Error("Given argument is undefined !");
            }
            return false;
        }
        if (arg === null) {
            if (error) {
                throw new Error("Given argument is null !");
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
    isFunction(func: Function, error: boolean): boolean {
        if (this.isNotUndefined(func, error)) {
            let isFunc = this.checkerObject.toString.call(func) === "[object Function]";
            if (!isFunc) {
                if (error) {
                    throw new Error("Given argument is not a function !");
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
            if (!this.isNotEmpty(func.name)) {
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
                throw new Error("Given format is not valid object !");
            }
            return false;
        }
        return true;
    }

    /**
     * Checks is json or not
     * @param obj
     * @param error
     * @returns {boolean}
     */
    isJson(obj: Map, error: boolean): boolean {
        if (!IsJS.object(obj)) {
            if (error) {
                throw new Error("Given format is not valid json format !");
            }
            return false;
        }
        return true;
    }

    /**
     * Checks is integer or not
     * @param n
     * @param error
     * @returns {boolean}
     */
    isInteger(n: number, error: boolean): boolean {
        /* eslint-disable eqeqeq */
        if (!(Number(n) == n && n % 1 === 0)) {
            if (error) {
                throw new Error("Given argument is not a integer !");
            }
            return false;
        }
        return true;
    }

    /**
    * Checks is string or not
    * @param obj
    * @param error
    * @returns {boolean}
    */
    isString(obj: string, error: boolean): boolean {
        if (!IsJS.string(obj)) {
            if (error) {
                throw new Error("Given format is not valid string !");
            }
            return false;
        }
        return true;
    }

    /**
    * Checks is array or not
    * @param obj
    * @param error
    * @returns {boolean}
    */
    isArray(obj: string, error: boolean): boolean {
        if (!IsJS.array(obj)) {
            if (error) {
                throw new Error("Given format is not valid array !");
            }
            return false;
        }
        return true;
    }

    /**
     * Checks is Map Object or not
     * @param obj
     * @param error
     * @returns {boolean}
     */
    isMap = (obj: Map, error: boolean): boolean => {
        let result = true;
        if (IsJS.hash(obj)) {
            for (const key in obj) {
                if (this.isFunction(obj[key])) {
                    result = false;
                    break;
                } else if (IsJS.hash(obj[key])) {
                    result = this.isMap(obj[key]);
                    if (!result) {
                        break;
                    }
                }
            }
        } else {
            result = false;
        }
        if (result && error) {
            throw new Error("Given format is not valid hash map !");
        }
        return result;
    }

    /**
     * Checks instance is React Component or not.
     * @param {Object} instance
     * @param {boolean} error
     * @returns {boolean}
     */
    isReactComponent(instance: Object, error: boolean): boolean {
        /* disable-eslint no-underscore-dangle */
        if (!(instance && instance.$$typeof)) {
            if (error) {
                throw new Error(`Given component is not a react component ! Component :${instance}`);
            }
            return false;
        }
        return true;
    }
    /**
     * Checks Class is extended from React.Component or not.
     * @param {Object} instance
     * @param {boolean} error
     * @returns {boolean}
     */
    isReactComponentClass(clazz: Function, error: boolean): boolean {
        if (!(checkerObject.isPrototypeOf.call(React.Component, clazz))) {
            if (error) {
                throw new Error(`Given component class is not a React.Component ! Class :${clazz}`);
            }
            return false;
        }
        return true;
    }

    /**
     * Checks given value type is Number, Boolean, Array, String, Date, RegExp, Null, Function, Undefined
     * @param obj
     * @param error
     * @returns {boolean}
     */
    isKnownType(obj: Object, error: boolean) {
        switch (toString.call(obj)) {
            case "[object Number]":
            case "[object Boolean]":
            case "[object Array]":
            case "[object String]":
            case "[object Date]":
            case "[object RegExp]":
            case "[object Null]":
            case "[object Function]":
            case "[object Undefined]":
            case "[object FormData]":
            case "[object File]":
                return true;
            default :
                if (error) {
                    throw new Error(`Given object is unknown ! Object:  ${obj}`);
                }
                return false;

        }
    }
}

export default new Assertions();
