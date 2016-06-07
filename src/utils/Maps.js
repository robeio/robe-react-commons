/**
 * Maps { Object } Utility
 */
class Maps {

    /**
     * callback for each element on map
     * @param map
     * @param callback
     */
    forEach(map, callback) {
        for (let key in map) {
            if (map.hasOwnProperty(key)) {
                callback(map[key], key, map)
            }
        }
    };

    /**
     *
     * @param map
     * @returns {Array}
     */
    toArray(map) {
        let array = [];
        for (let key in map)
            if (map.hasOwnProperty(key))
                array.push(map[key]);
        return array;
    };

    /**
     *
     * @param src
     * @param dest
     */
    merge(src, dest) {
        for (let key in src)
            if (src.hasOwnProperty(key))
                dest[key] = src[key];
    };

    /**
     *
     * @param src
     * @param dest
     */
    mergeMissing(src, dest) {
        for (let key in src)
            if (src.hasOwnProperty(key) && !dest.hasOwnProperty(key))
                dest[key] = src[key];
    };
}

export default new Maps();
