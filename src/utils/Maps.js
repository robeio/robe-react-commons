import Assertions from "./Assertions";

const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Maps { Object } Utility
 */
class Maps {

    /**
     * @description finds the each element in the map and sets it to callback function.
     * @param map
     * @param callback
     */
    static forEach(map : Object, callback : Function) {
        for (const key in map) {
            if (hasOwnProperty.call(map, key)) {
                callback(map[key], key, map);
            }
        }
    }

    /**
     *
     * @param map
     * @returns {Array}
     */
    static toArray(map : Object) : Array {
        let array = [];
        for (let key in map) {
            if (hasOwnProperty.call(map, key)) {
                array.push(map[key]);
            }
        }
        return array;
    }

    /**
     * mixin src to the destination and return
     * @param src
     * @param dest
     */
    static merge(src : Object, dest : Object): Object {
        for (const key in src) {
            if (hasOwnProperty.call(src, key)) {
                dest[key] = src[key];
            }
        }
        return dest;
    }

    /**
     *
     * @param src
     * @param dest
     */
    static mergeMissing(src : Object, dest : Object) {
        for (let key in src) {
            if (hasOwnProperty.call(src, key) && !hasOwnProperty.call(dest, key)) {
                dest[key] = src[key];
            }
        }
    }


    /**
     * merges source object to destination object as recursive.
     * merges all map object which is property in source or destination.
     * holds all objects which is defined in destination if not defined
     * @example <caption>Sample mergeDeep.</caption>
     * // returns 2
     * <pre>
     * let src = {
     *    a: {
     *            aa: "aa"
     *        }
     *    };
     * let dest = {
     *        a: {
     *            bb: "bb"
     *        }
     *    };
     * let dest = Maps.mergeDeep(src, dest);

     * // result: { a: { aa: "aa", bb: "bb" } }
     * </pre>
     * @param src
     * @param dest
     */
    static mergeDeep(src : Object, dest : Object): Object {
        for (const key in src) {
            if (hasOwnProperty.call(src, key)) {
                let destValue = dest[key];
                let sourceValue = src[key];
                if (Assertions.isKnownType(destValue) || Assertions.isKnownType(sourceValue)) {
                    dest[key] = src[key];
                } else {
                    dest[key] = Maps.mergeDeep(src[key], dest[key]);
                }
            }
        }
        return dest;
    }
    /**
     *
     * @description finds objects in map which has given key with type(type is optional).
     *
     * @param {Object} object
     * @param {string} name
     * @returns {Array}
     */
    static getObjectsWhichHasKeyInMap(map: Object, key: string, type: string): Array {
        let values = [];
        for (let name in map) {
            if (hasOwnProperty.call(map, name)) {
                let child = map[name];
                if (child[key] && (!type || typeof child[key] === type)) { // eslint-disable-line
                    values.push(map[name]);
                }
            }
        }
        return values;
    }
    /**
     * find Map size
     * @param obj
     * @returns {number}
     */
    static getLength(obj: Object): number {
        if (obj === undefined || obj === null) {
            return 0;
        }
        let size = 0;
        for (let key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                size += 1;
            }
        }
        return size;
    }
}

export default Maps;
