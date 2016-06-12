import Objects from "./Objects";
import is from "is-js";

/**
 * This is a wrapper class for all kind of data. Basic it wraps the data and generates an ID index for all sub data
 */
class DataWrapper {
    __data;

    // An array which holds pairs for hashes of objects. Pair contains two elements , 1st is path to object 2nd is hash of object
    __idTree = [];
    __idField = "oid";

    constructor(data: Object, idField: Object) {
        this.__data = Objects.deepCopy(data);
        if (idField) {
            this.__idField = idField;
        }
        this.generateIdTree([], this.__data, this.__idTree);
    }

    generateIdTree = (path: Object, obj: Object, idTree: Object) => {
        if (is.hash(obj)) {
            // Add Pair (path , hash)
            idTree.push(path);
            idTree.push(this._getId(obj));
        }
        if (is.array(obj) || is.hash(obj)) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let childPath = path.slice();
                    childPath.push(key);
                    this.generateIdTree(childPath, obj[key], idTree);
                }
            }
        }
    };

    getPath = (id: Object): boolean => {
        let i = this.__idTree.length;
        while (i--) {
            if (this.__idTree[i--] === id) {
                return {
                    path: this.__idTree[i],
                    index: i
                };
            }
        }
        return false;
    };

    _getId = (item: Object): Object => {
        return item[this.__idField];
    };

    get = (): Object => {
        return this.__data;
    };


    add = (item: Object): Object => {
        if (this.getPath(this._getId(item))) {
            return false;
        }
        let size = this.__data.length;
        this.__data[size] = item;
        this.generateIdTree([size], item, this.__idTree);
        return item;
    };

    replace = (oldItem: Object, newItem: Object): boolean => {
        let path = this.getPath(this._getId(oldItem));
        if (!path) {
            return false;
        }
        let obj = this.__data;
        for (let i = 0; i < path.path.length; i++) {
            if (i === path.path.length - 1) {
                obj[path.path[i]] = newItem;
            } else {
                obj = obj[path.path[i]];
            }
        }
        this.__idTree[path.index + 1] = this._getId(newItem);
        return newItem;
    };

    remove = (item: Object): number => {
        let path = this.getPath(this._getId(item));
        if (!path) {
            return -1;
        }
        let obj = this.__data;
        let returnIndex = -1;
        for (let i = 0; i < path.path.length; i++) {
            if (i === path.path.length - 1) {
                if (is.array(obj)) {
                    // obj.splice(path["path"][i], 1);
                    delete obj[path.path[i]];
                    returnIndex = i;
                } else {
                    delete obj[path.path[i]];
                    returnIndex = i;
                }
            } else {
                obj = obj[path.path[i]];
                returnIndex = i;
            }
        }
        this.__idTree.splice(path.index, 2);
        return returnIndex;
    };

}

export default DataWrapper;
