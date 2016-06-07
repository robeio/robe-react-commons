class Arrays {

    /**
     *
     * @param sourceArray
     * @param targetObject
     * @returns {boolean}
     */
    removeByValue(sourceArray: Array<any>, targetObject : any): boolean {
        for (let i = sourceArray.length; i--;) {
            if (sourceArray[i] === target) {
                sourceArray.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param sourceArray
     * @param targetKey
     * @param targetObject
     * @returns {boolean}
     */
    removeByKey(sourceArray : Array<any>, targetKey : string, targetObject : any) : boolean {
        for (let i = sourceArray.length; i--;) {
            if (sourceArray[i][targetKey] === targetObject[targetKey]) {
                sourceArray.splice(i, 1);
                return true;
            }
        }
        return false;
    }


    /**
     *
     * @param sourceArray
     * @param targetObject
     * @returns {*}
     */
    indexOf(sourceArray: Array<any>, targetObject : any) : number {
        for (let i = sourceArray.length; i--;) {
            if (sourceArray[i] === targetObject) {
                return i;
            }
        }
        return -1;
    }

    /**
     *
     * @param sourceArray
     * @param targetKey
     * @param targetObject
     * @returns {*}
     */
    indexOfByKey(sourceArray : Array<any>, targetKey : string, targetObject : any)  : number {
        for (let i = sourceArray.length; i--;) {
            if (sourceArray[i][targetKey] === targetObject[targetKey]) {
                return i;
            }
        }
        return -1;
    }

    /**
     *
     * @param sourceArray
     * @param targetKey
     * @param targetObject
     * @returns {*}
     */
    getValueByKey(sourceArray : Array<any>, targetKey : string, targetObject : any) : any {
        const index : number =  this.indexOfByKey(sourceArray,targetKey,targetObject);
        return index != -1 ? sourceArray[index] : undefined;
    }

    /**
     *
     * @param sourceArray
     * @param targetKey
     * @param targetObject
     * @returns {boolean}
     */
    isExistByKey(sourceArray : Array<any>, targetKey : string, targetObject : any)  : boolean {
        for (let i = sourceArray.length; i--;) {
            if (sourceArray[i][targetKey] === targetObject[targetKey]) {
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
