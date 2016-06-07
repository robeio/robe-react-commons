/**
 * A singleton class which implements mostly used array operations.
 */
class Arrays {

    /**
     * Removes the given item from the given array.
     * @param {Array} source Source array for the remove operation. This array will be modified at the end of the operation.
     * @param {any} target Target to match.
     * @returns {boolean} If the operation ended sucessfully than "true", else "false".
     */
    remove(source: Array<any>, target: any): boolean {
        for (let i = source.length; i--;) {
            if (source[i] === target) {
                source.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Removes the item with target value from the given array. Checks arrayItem[key] === target removes if matches.
     * @param {Array} source Source array for the remove operation. This array will be modified at the end of the operation.
     * @param {string} key Key for checking array items.
     * @param {any} target Target to match.
     * @returns {boolean} If the operation ended sucessfully than "true", else "false".
     */
    removeByKey(source: Array<any>, key: string, target: any): boolean {
        for (let i = source.length; i--;) {
            if (source[i][key] === target[key]) {
                source.splice(i, 1);
                return true;
            }
        }
        return false;
    }


    /**
     *
     * @param source
     * @param target
     * @returns {*}
     */
    indexOf(source: Array<any>, target: any): number {
        for (let i = source.length; i--;) {
            if (source[i] === target) {
                return i;
            }
        }
        return -1;
    }

    /**
     *
     * @param source
     * @param key
     * @param target
     * @returns {*}
     */
    indexOfByKey(source: Array<any>, key: string, target: any): number {
        for (let i = source.length; i--;) {
            if (source[i][key] === target[key]) {
                return i;
            }
        }
        return -1;
    }

    /**
     *
     * @param source
     * @param key
     * @param target
     * @returns {*}
     */
    getValueByKey(source: Array<any>, key: string, target: any): any {
        const index: number = this.indexOfByKey(source, key, target);
        return index != -1 ? source[index] : undefined;
    }

    /**
     *
     * @param source
     * @param key
     * @param target
     * @returns {boolean}
     */
    isExistByKey(source: Array<any>, key: string, target: any): boolean {
        for (let i = source.length; i--;) {
            if (source[i][key] === target[key]) {
                return true;
            }
        }
        return false;
    }


    /**
     *
     * @param mapArray
     * @param key
     * @returns {Array}
     */
    extractArray(mapArray, key) {
        let array = [];
        for (let i = 0; i < mapArray.length; i++) {
            if (mapArray[i].hasOwnProperty(key)) {
                array.push(mapArray[i][key]);
            }
        }
        return array;
    };

    /**
     *
     * @param array
     * @param key
     * @param target
     * @returns {Array}
     */
    extractItem(array, key, target) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] != target) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    }
}

export default new Arrays();
