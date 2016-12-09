import Assertions from "./Assertions";

const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;
const ObjectTypePrefix = "[object ";
const returnSameFunction = (o) => {
    return o;
};

const NativeTypes = {
    Null: returnSameFunction,
    Undefined: returnSameFunction,
    String: (o) => {
        return String(o);
    },
    Boolean: returnSameFunction,
    Date: (o) => {
        return new Date(o.getTime());
    },
    Number: (o) => {
        return Number(o);
    },
    Function: returnSameFunction,
    RegExp: (o) => {
        return new RegExp(o);
    },
    File: returnSameFunction,
    FormData: returnSameFunction
};

/**
 * A singleton class which implements mostly used json object operations.
 *
 * @class Objects
 */
class Objects {


    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     *
     * @description Checks equal the string value of the given source  and  the string value of the given destination object( dest )
     *
     * @param {any} src Source object to compare the equality
     * @param {any} dest Destination object to compare the equality
     * @returns : {boolean} if the string value of the given source equals the string value of the given destination then "true" else "false"
     */
    static equals(src: Object, dest: Object): boolean {
        return JSON.stringify(src) === JSON.stringify(dest);
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
     *
     * @description creates and returns clone of the given source object ( src )
     *
     * @param src the given source object
     * @returns the clonse of the given source object
     */
    static deepCopy(src: Object): Object {
        return JSON.parse(JSON.stringify(src));
    }

    /* Returns the approximate memory usage, in bytes, of the specified object. The
     * parameter is:
     * object - the object whose size should be determined
     */
    static sizeOf(object: Object): number {
        // initialise the list of objects and size
        let size = 0;
        // loop over the objects
        switch (typeof object) {
            // the object is a boolean
            case "boolean":
                size += 4;
                break;
            // the object is a number
            case "number":
                size += 8;
                break;
            // the object is a string
            case "string":
                size += 2 * object.length;
                break;
            // the object is a generic object
            case "object":
                // if the object is not an array, add the sizes of the keys
                if (toString.call(object) !== "[object Array]") {
                    for (let key in object) {
                        if (hasOwnProperty.call(object, key)) {
                            size += 2 * key.length;
                            size += Objects.sizeOf(object[key]);
                        }
                    }
                } else { // array objects
                    for (let i = 0; i < object.length; i += 1) {
                        size += Objects.sizeOf(object[i]);
                    }
                }
                break;
            default:
        }
        // return the calculated size
        return size;
    }

    /**
     *
     * @param object
     * @param key
     * @returns {boolean}
     */
    static getTypeName(object: Object) {
        let objectType = toString.call("fff");
        return objectType.substring(ObjectTypePrefix, objectType - 1);
    }

    /**
     *
     * @param object
     * @param key
     * @returns {boolean}
     */
    static hasProperty(object: Object, key: string) {
        return hasOwnProperty.call(object, key);
    }

    /**
     *
     * clone object child recursively.
     *
     * @param src
     * @param dest
     * @param references
     * @returns {Object}
     */
    static cloneChilds(src: Object, dest: Object, cloneNativeTypes: boolean, references: Array<Function>): Object {
        if (src == null) return dest;
        if (dest == null) return Objects.clone(src, cloneNativeTypes, references);
        for (let key in src) {
            if (hasOwnProperty.call(src, key)) {
                let destProp = dest[key];
                destProp = destProp ?
                    Objects.cloneChilds(src[key], cloneNativeTypes, destProp[key]) :
                    Objects.clone(src[key], cloneNativeTypes, references);
                dest[key] = destProp;
            }
        }
        return dest;
    }


    /**
     * @param array
     * @param cloneNativeTypes
     * @param references
     * @returns {Array}
     */
    static cloneArray(array: Array, cloneNativeTypes: boolean, references: Array<Function>): Object {
        let destination = [];
        for (let i = 0; i < array.length; i += 1) {
            /* eslint-disable no-underscore-dangle */
            destination[i] = Objects.__clone(array[i], cloneNativeTypes, references);
        }
        return destination;
    }

    /**
     * @param array
     * @param cloneNativeTypes
     * @param references
     * @returns {Array}
     */
    static cloneObject(obj: Object, cloneNativeTypes: boolean, references: Array<Function>): Object {
        // React Component then return
        if (Assertions.isReactComponent(obj)) {
            return obj;
        }
        // DOM Element
        if (obj.nodeType && Objects.getTypeName(obj.cloneNode) === "Function") {
            return obj;
        }
        let destination = {};
        for (let key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                destination[key] = Objects.__clone(obj[key], cloneNativeTypes, references);
            }
        }
        return destination;
    }


    /**
     *
     * @param src
     * @param cloneNativeTypes
     * @param references
     * @returns {Object}
     */
    static clone(src: Object, cloneNativeTypes: boolean, references: Array<Function>): Object {
        /* eslint-disable no-underscore-dangle */
        return Objects.__clone(src, cloneNativeTypes, references);
    }

    /**
     * @param src
     * @param cloneNativeTypes
     * @param references
     * @returns {*}
     * @private
     */
    static __clone(src: Object, cloneNativeTypes: boolean, references: Array<Function>): Object {
        /* eslint-disable no-underscore-dangle */
        let objectType = Objects.getTypeName(src);
        let cloneNative = NativeTypes[objectType];
        if (cloneNative) {
            return cloneNativeTypes === true ? cloneNative(src) : src;
        }
        if (references) {
            for (let i = 0; i < references.length; i += 1) {
                if (typeof references[i] === "function" && src instanceof references[i]) {
                    return src;
                }
            }
        }
        switch (objectType) {
            case "Array":
                return Objects.cloneArray(src, cloneNativeTypes, references);
            case "Object":
                return Objects.cloneObject(src, cloneNativeTypes, references);
            default:
                return src;
        }
    }

}

export default Objects;
