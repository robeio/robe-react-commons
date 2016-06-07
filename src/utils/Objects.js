
/**
 * (description)
 * 
 * @class Objects
 */
class Objects {


    /**
     * (description)
     * 
     * @param {*} src (description)
     * @param {*} dest (description)
     * @returns (description)
     */
    equals(src: any, dest: any) {
        return JSON.stringify(src) === JSON.stringify(dest);
    }

    /**
     * (description)
     * 
     * @param src (description)
     * @returns (description)
     */
    deepCopy(src) {
        return JSON.parse(JSON.stringify(src));
    }
}

module.exports = new Objects();