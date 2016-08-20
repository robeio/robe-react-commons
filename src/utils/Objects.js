const objectChecker = {};
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
    equals(src : Object, dest: Object) : boolean {
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
    deepCopy(src : Object) : Object {
        return JSON.parse(JSON.stringify(src));
    }

    /**
     *  @description Calculates object size in bytes.
     *  @param object
     *  @return size in bytes
     */
    calculateObjectSize(object: Object) : Number {
        let objectList = [];
        let stack = [object];
        let bytes = 0;
        while (stack.length) {
            let value = stack.pop();
            if (typeof value === "boolean") {
                bytes += 4;
            } else if (typeof value === "string") {
                bytes += value.length * 2;
            } else if (typeof value === "number") {
                bytes += 8;
            } else if (typeof value === "object" && objectList.indexOf(value) === -1) {
                objectList.push(value);
                for (let i in value) {
                    stack.push(value[i]);
                }
            }
        }
        return bytes;
    }

    /* Returns the approximate memory usage, in bytes, of the specified object. The
     * parameter is:
     * object - the object whose size should be determined
     */
    sizeOf(object: Object): number {
        // initialise the list of objects and size
        let objects = [object];
        let size = 0;
        let index = 0;
        // loop over the objects
        for (; index < objects.length; index++) {
            // determine the type of the object
            let obj = objects[index];
            switch (typeof obj) {
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
                    size += 2 * obj.length;
                    break;
                // the object is a generic object
                case "object":
                    // if the object is not an array, add the sizes of the keys
                    if (objectChecker.toString.call(obj) !== "[object Array]") {
                        for (let key in obj) {
                            if (objectChecker.hasOwnProperty.call(obj, key)) {
                                size += 2 * key.length;
                                size += this.sizeOf(obj[key]);
                            }
                        }
                    } else { // array objects
                        for (let i = 0; i < obj.length; i++) {
                            size += this.sizeOf(obj[i]);
                        }
                    }
                    break;
                default:
            }
        }
        // return the calculated size
        return size;
    }
}

export default new Objects();
