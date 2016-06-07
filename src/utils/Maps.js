class Maps {
    forEach(map, callback) {
        for (let key in map) {
            if (map.hasOwnProperty(key)) {
                callback(map[key], key, map)
            }
        }
    };

    toArray(map) {
        let array = [];
        for (let key in map)
            if (map.hasOwnProperty(key))
                array.push(map[key]);
        return array;
    };

    merge(src, dest) {
        for (let key in src)
            if (src.hasOwnProperty(key))
                dest[key] = src[key];
    };

    mergeMissing(src, dest) {
        for (let key in src)
            if (src.hasOwnProperty(key) && !dest.hasOwnProperty(key))
                dest[key] = src[key];
    };
}

module.exports = new Maps();
