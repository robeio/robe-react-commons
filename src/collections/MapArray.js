import is from "is-js";// eslint-disable-line import/extensions
import Class from "../class/Class";

/**
 * This is a data structure which is actually an Array which holds Maps. This is the common structure to hold grid data.
 * Also it supports for custom idField keys.
 * @class MapArray
 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["__returnIdCallBack"] }] */

export default class MapArray extends Class {

    /**
     * Actual data
     */
    __data;

    /**
     * Key of the id property of maps.
     */
    __idField = "oid";

    /**
     * Creates an instance of MapArray.
     *
     * @param {Array} data
     * @param {Object} idField
     */
    constructor(data: Array, idField: Object) {
        super();
        if (is.array(data)) {
            this.__data = data;
        } else {
            throw new Error("Data must be an array of maps.");
        }
        if (idField) {
            this.__idField = idField;
        }
    }


    /**
     * Returns id field of the data.
     * It is used for all unique controls and all components that uses
     * MapArray must get this field from MapArray to work properly.
     *
     * @returns {Object} idField
     */
    getIdField(): Object {
        return this.__idField;
    }


    /**
     * Finds the item by matching id.
     * @param {Object} id of the target item.
     * @return {Object} item that matches
     */
    findById(id: Object): Object {
        return this.__findById(id, this.__returnIdCallBack);
    }

    /**
     * Finds the item by matching .
     * @param {Object} the target item.
     * @return {Object} item that matches
     */
    find(target: Object): Object {
        let id = this.__getId(target);
        return this.findById(id);
    }

    /**
     * Returns the actual data instance.
     * @return {Array<Object>} actual data
     */
    getData(): Object {
        return this.__data;
    }


    /**
     * Adds the item to the end of the array.
     * First it checks whether item with the same if already exists or not.
     * @param {Object} item to add
     * @return {boolean} "true" item added / "false" item already exists.
     */
    add(item: Object): boolean {
        if (this.find(item) !== undefined) {
            return false;
        }
        let size = this.__data.length;
        this.__data[size] = item;
        return true;
    }

    /**
    * Replaces the oldItem with the given newItem.
    * @param {Object} newItem to put
    * @return {boolean} "true" item replaced / "false" oldItem does not exists.
    */
    replace(newItem: Object): boolean {
        let result = this.__findById(this.__getId(newItem), (parent: Object, index: number): Object => {
            delete parent[index];
            parent[index] = newItem;
            return newItem;
        });
        return result !== undefined;
    }

    /**
    * Removes the item  from the array.
    * First it checks whether item with the same if already exists or not.
    * @param {Object} item to remove
    * @return {boolean} "true" item removes / "false" item does not exists.
    */
    remove(item: Object): boolean {
        let result = this.__findById(this.__getId(item), (parent: Object, index: number): Object => {
            delete parent[index];
            parent = parent.splice(index, 1);
            return true;
        });
        return result !== undefined;
    }


    /**
     * Returns id of the given target according to the id key proviced at constructor.
     * @return id of the target
     */
    __getId(item: Object): Object {
        return item[this.__idField];
    }

    /**
     * Finds the target by matching id.
     * First finds the target than returns the callback given. Callback will receive 2 propeties (parent, index).
     * @param {Object} id of the item.
     * @param {fn} callback function to call at the match.
     * @return {any} result of the callback
     */
    __findById(id: Object, cb: Function): Object {
        let i = this.__data.length;
        while (i > 0) {
            i -= 1;
            if (this.__getId(this.__data[i]) === id) {
                // Return the position of the match to use as reference.
                return cb(this.__data, i);
            }
        }

        return undefined;
    }

    /**
     * A private method for returning id of the given map.
     * Used as a callback function
     * @param {Object} parent
     * @param {number} index
     * @returns {Object}
     */
    __returnIdCallBack(parent: Object, index: number): Object {
        return parent[index];
    }
}
