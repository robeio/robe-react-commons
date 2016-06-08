/**
 * @desciption A singleton class which implements mostly used array operations.
 */
class Arrays {

    /**
     * Removes the given item from the given array.
     * @param {Array} source Source array for the remove operation. *This array will be modified at the end of the operation.*
     * @param {any} target Target to match.
     * @returns {boolean} "true": target removed , "false": target not found.
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
     * @returns {boolean} "true": target removed , "false": target not found.
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
     * Finds the index of the given target in the given array.
     * @param {Array} source Source array for the operation.
     * @param {any} target Target to match.
     * @returns {number} The index of the target. Returns "-1" in case of no match.
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
     * Finds the index of the item with target value from the given array. Checks arrayItem[key] === target returns index if matches.
     * @param {Array} source Source array for the operation.
     * @param {string} key Key for checking array items.
     * @param {any} target Target to match.
     * @returns {number} The index of the target. Returns "-1" in case of no match.
     */
    indexOfByKey(source: Array<any>, key: string, target: any): number {
        for (let i = source.length; i--;) {
            if (source[i][key] === target) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Returns the value of the item with the given key from the array. Checks arrayItem[key] === target returns value if matches.
     * @param {Array} source Source array for the operation.
     * @param {string} key Key for checking array items.
     * @param {any} target Target to match.
     * @returns {any} The item. Returns "undefined" in case of no match.
     */
    getValueByKey(source: Array<any>, key: string, target: any) : any {
        const index: number = this.indexOfByKey(source, key, target);
        return index !== -1 ? source[index] : undefined;
    }

    /**
     * Checks if the value of the item with the given key from the array exists. Checks arrayItem[key] === target returns "true" if matches.
     * @param {Array} source Source array for the operation.
     * @param {string} key Key for checking array items.
     * @param {any} target Target to match.
     * @returns {boolean} If exists "true", else "false".
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
     * Extracts an array from the given array. Collects all values with the given key from array items and returns as an array.
     * @param {Array} source Source array for the operation.
     * @param {string} key Key for checking array items.
     * @returns {Array} The resulting array with the values. Returns an empty array in case of no key match.
     */
    extractValueArray(source: Array<any>, key: string): Array<any> {
        let array = [];
        for (let i = 0; i < source.length; i++) {
            if (source[i].hasOwnProperty(key)) {
                array.push(source[i][key]);
            }
        }
        return array;
    }

    /**
     * Extracts an array from the given array. Collects all items with the given key,target match from array and returns as an array.
     * @param {Array} source Source array for the operation.
     * @param {string} key Key for checking array items.
     * @param {any} target Target to match.
     * @returns {Array} The resulting array of items matches. Returns an empty array in case of no key match.
     */
    extractItemArray(source: Array<any>, key: string, target: any): Array<any> {
        let newArray = [];
        for (let i = 0; i < source.length; i++) {
            if (source[i][key] !== target) {
                newArray.push(source[i]);
            }
        }
        return newArray;
    }
}

export default new Arrays();
