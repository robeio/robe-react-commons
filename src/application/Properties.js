import Assertions from "../utils/Assertions";
import Objects from "../utils/Objects";

/**
 * A singleton class which hold all application general informations.
 */
export default class Properties {

    constructor() {
        this.params = {
            MAX_PROPERTY_SIZE: 1048576
        };
    }

    /**
     * Set parameter with it's value to the Property
     * @param key
     * @param value
     * @returns {boolean}
     */
    set = (key: string, value: any): boolean => {
        Assertions.isNotEmpty(key, true);
        Assertions.isNotUndefined(value, true);
        let sizeOfValue = Objects.calculateObjectSize(value);
        if (sizeOfValue >= this.params.MAX_PROPERTY_SIZE) {
            throw new Error(`Object size cannot be greater than ${this.params.MAX_PROPERTY_SIZE} bytes. The key is ${key}`);
        }
        this.params[key] = value;
        return true;
    }
    /**
     * get value from the Property by parameter key
     * @param key
     * @returns {*}
     */
    get = (key: string): any => {
        return this.params[key];
    }
    /**
     * Remove parameter from the Property if it is exist by key in the Property map
     * @param key
     * @returns {boolean}
     */
    remove = (key: string): boolean => {
        Assertions.isNotEmpty(key, true);
        if (!this.params[key]) {
            return false;
        }
        delete this.params[key];
        return true;
    }
}
