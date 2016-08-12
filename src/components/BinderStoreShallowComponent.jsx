import Assertions from "../utils/Assertions";
import StoreShallowComponent from "./StoreShallowComponent";

/**
 * A component which extends ShallowComponent and manages store operations.
 * Usually used for components with store operations.
 * Has support for auto objectId increment and store management.
 * @export
 * @class BinderStoreShallowComponent
 * @extends {StoreShallowComponent}
 */
export default class BinderStoreShallowComponent extends StoreShallowComponent {

    constructor(props: Object) {
        super(props);
        this.__bindAll(this);
    }

    /**
     * Binds all methods to the instance.
     * @param {Object} instance to bind
     */
    __bindAll(instance: Object) {
        let names = Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            if (name !== "constructor" && Assertions.isFunction(instance[name])) {
                instance[name] = instance[name].bind(this);
            }
        }
    }
}
