import Objects from "./Objects";

const checkerObject = {};
/**
 * A singleton class which implements mostly used array operations.
 */
class Arrays {

    /**
     * Removes the given item from the given array.
     * @param {Array} source Source array for the remove operation. *This array will be modified at the end of the operation.*
     * @param {any} target Target to match.
     * @returns {boolean} "true": target removed , "false": target not found.
     */
    static remove(source: Array<any>, target: any): boolean {
        for (let i = 0; i < source.length; i += 1) {
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
    static removeByKey(source: Array<any>, key: string, target: any): boolean {
        for (let i = 0; i < source.length; i += 1) {
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
    static indexOf(source: Array<any>, target: any): number {
        for (let i = 0; i < source.length; i += 1) {
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
    static indexOfByKey(source: Array<any>, key: string, target: any): number {
        for (let i = 0; i < source.length; i += 1) {
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
    static getValueByKey(source: Array<any>, key: string, target: any): any {
        const index: number = Arrays.indexOfByKey(source, key, target);
        return index !== -1 ? source[index] : undefined;
    }

    /**
     * Checks if the value of the item with the given key from the array exists. Checks arrayItem[key] === target returns "true" if matches.
     * @param {Array} source Source array for the operation.
     * @param {string} key Key for checking array items.
     * @param {any} target Target to match.
     * @returns {boolean} If exists "true", else "false".
     */
    static isExistByKey(source: Array<any>, key: string, target: any): boolean {
        for (let i = 0; i < source.length; i += 1) {
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
    static extractValueArray(source: Array<any>, key: string): Array<any> {
        let array = [];
        for (let i = 0; i < source.length; i += 1) {
            if (checkerObject.hasOwnProperty.call(source[i], key)) {
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
    static extractItemArray(source: Array<any>, key: string, target: any): Array<any> {
        let newArray = [];
        for (let i = 0; i < source.length; i += 1) {
            if (source[i][key] === target) {
                newArray.push(source[i]);
            }
        }
        return newArray;
    }

    /**
     * Merges the given arrays.
     * Note: It used deepEqual to check equality.
     * @see Objects.deepEqual
     * @param {Array<Array<any>>} arrays
     * @return {Array<any>}
     */
    static mergeArrays(...arrays: Array<Array<any>>): Array<any> {
        if (!arrays) return [];
        let resultArray: Array<any> = [];
        for (let i = 0; i < arrays.length; i++) {
            let array = arrays[i];
            if (array) {
                for (let j = 0; j < array.length; j++) {
                    let isExist = false;
                    for (let t = 0; t < resultArray.length; t++) {
                        if (Objects.deepEqual(array[j], resultArray[t])) {
                            isExist = true;
                            break;
                        }
                    }
                    if (!isExist) {
                        resultArray.push(array[j]);
                    }
                }
            }
        }
        return resultArray;
    }

    /**
     * Merges the given arrays.
     * Note: It used indexOf to check equality.
     * IndexOf can be success on accepted Native Types = [number, boolean, string, null, function, undefined]
     * @param {Array<Array<T>>} arrays
     * @return {Array<T>}
     */
    static mergeArraysForNativeType<T>(...arrays: Array<Array<T>>): Array<T> {
        if (!arrays) return [];
        let resultArray: T[] = [];
        for (let i = 0; i < arrays.length; i++) {
            let array = arrays[i];
            if (array) {
                for (let j = 0; j < array.length; j++) {
                    if (resultArray.indexOf(array[j]) === -1) {
                        resultArray.push(array[j]);
                    }
                }
            }
        }
        return resultArray;
    }

    /**
     * Removes the given items from the given source array.
     * Note: It used deepEqual to check equality.
     * @see Objects.deepEqual
     * @param from
     * @param what
     * @return {*}
     */
    static removeAll<T>(from: T[], what: T[]): T[] {
        if (!from) return [];
        if (!what || what.length === 0) return from.slice(0);
        let newArray = [];
        for (let i = 0; i < from.length; i++) {
            let willRemove = false;
            for (let j = 0; j < what.length; j++) {
                if (Objects.equals(from[i], what[j])) {
                    willRemove = true;
                    break;
                }
            }
            if (!willRemove) {
                newArray.push(from[i]);
            }
        }
        return newArray;
    }

    /**
     * Removes the given items from the given source array.
     * Note: It used indexOf to check equality.
     * IndexOf can be success on accepted Native Types = [number, boolean, string, null, function, undefined]
     * @param from
     * @param what
     * @return {any[]}
     */
    static removeAllForNativeType<T>(from: T[], what: T[]): any[] {
        if (!from) return [];
        if (!what || what.length === 0) return from.slice(0);
        let newArray = [];
        for (let i = 0; i < from.length; i++) {
            let value = from[i];
            if (what.indexOf(value) === -1) {
                newArray.push(from[i]);
            }
        }
        return newArray;
    }

}

export default Arrays;
