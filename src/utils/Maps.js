import Assertions from "./Assertions";
/**
 * Maps { Object } Utility
 */
class Maps {

    /**
     * @description finds the each element in the map and sets it to callback function.
     * @param map
     * @param callback
     */
    forEach(map : Object, callback : Function) {
        for (const key in map) {
            if (map.hasOwnProperty(key)) {
                callback(map[key], key, map);
            }
        }
    }

    /**
     *
     * @param map
     * @returns {Array}
     */
    toArray(map : Object) : Array {
        let array = [];
        for (let key in map) {
            if (map.hasOwnProperty(key)) {
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
    merge(src : Object, dest : Object): Object {
        for (const key in src) {
            if (src.hasOwnProperty(key)) {
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
    mergeMissing(src : Object, dest : Object) {
        for (let key in src) {
            if (src.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
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
    mergeDeep(src : Object, dest : Object): Object {
        for (const key in src) {
            if (src.hasOwnProperty(key)) {
                if (Assertions.isObject(src[key]) && Assertions.isObject(dest[key])) {
                    dest[key] = this.merge(src[key], dest[key]);
                } else {
                    dest[key] = src[key];
                }
            }
        }
        return dest;
    }
}

export default new Maps();
