class Arrays {
    remove(array: Array<any>, target: any): boolean {
        for (let i = array.length; i--;) {
            if (array[i] === target) {
                array.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    removeItem(array, key, target) {
        for (let i = array.length; i--;) {
            if (array[i][key] === target[key]) {
                array.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    findItem(array, key, target) {
        for (let i = array.length; i--;) {
            if (array[i][key] === target[key]) {
                return true;
            }
        }
        return false;
    }
    findIndex(array, target) {
        for (let i = array.length; i--;) {
            if (array[i] === target) {
                return i;
            }
        }
        return -1;
    }


    findIndexByProperty(array, key, target) {
        for (let i = array.length; i--;) {
            if (array[i][key] === target) {

                return i;
            }
        }
        return -1;
    }

    findValueByProperty(array, key, target) {
        for (let i = array.length; i--;) {
            if (array[i][key] === target) {
                return array[i];
            }
        }
        return undefined;
    }

    extractArray(mapArray, key) {
        let array = [];
        for (let i = 0; i < mapArray.length; i++) {
            if (mapArray[i].hasOwnProperty(key)) {
                array.push(mapArray[i][key]);
            }
        }
        return array;
    };

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
module.exports = new Arrays();
