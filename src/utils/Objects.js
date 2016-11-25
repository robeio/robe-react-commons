const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;
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
    sizeOf(object: Object): number {
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
                            size += this.sizeOf(object[key]);
                        }
                    }
                } else { // array objects
                    for (let i = 0; i < object.length; i += 1) {
                        size += this.sizeOf(object[i]);
                    }
                }
                break;
            default:
        }
        // return the calculated size
        return size;
    }

    clone(obj: Object): Object {
        if (obj === null || typeof obj !== "object" || "isActiveClone" in obj) {
            return obj;
        }
        let temp;
        if (obj instanceof Date) {
            temp = new obj.constructor(); // or new Date(obj);
        } else {
            temp = obj.constructor();
        }
        for (let key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                obj.isActiveClone = null;
                temp[key] = this.clone(obj[key]);
                delete obj.isActiveClone;
            }
        }
        return temp;
    }
}

export default new Objects();
