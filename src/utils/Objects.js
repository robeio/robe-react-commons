
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
            if (typeof value === 'boolean') {
                bytes += 4;
            } else if (typeof value === 'string') {
                bytes += value.length * 2;
            } else if (typeof value === 'number') {
                bytes += 8;
            } else if (typeof value === 'object' && objectList.indexOf( value ) === -1) {
                objectList.push(value);
                for( let i in value ) {
                    stack.push( value[ i ] );
                }
            }
        }
        return bytes;
    }
}

export default new Objects();
