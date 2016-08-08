import Assertions from "./Assertions";

/**
 * A component which is Js Class and which need to binds all methods to the instance.
 * Essential to use at all components if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class BinderClass
 */
export default class BinderClass {
    /**
     * Binds all methods to the instance.
     */
    constructor() {
        let names = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            if (name !== "constructor" && Assertions.isFunction(this[name])) {
                this[name] = this[name].bind(this);
            }
        }
    }
}
