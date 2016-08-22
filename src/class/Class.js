import Assertions from "../utils/Assertions";
/**
 * A class which  implements __bindAll which binds all methods to the instance.
 * Essential to use at all classes if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class Class
 */
export default class Class {
    constructor() {
        this.bindAll(this);
    }

    /**
     * Binds all methods to the instance.
     * @param {Object} instance to bind
     */
    bindAll(instance: Object) {
        let names = Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            if (name !== "constructor" && Assertions.isFunction(instance[name])) {
                instance[name] = instance[name].bind(instance);
            }
        }
    }
}
