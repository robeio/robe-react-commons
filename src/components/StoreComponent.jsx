import React from "react";
import ShallowComponent from "./ShallowComponent";
import BaseStore from "../stores/BaseStore";

/**
 * A component which extends ShallowComponent and manages store operations.
 * Usually used for components with store operations.
 * Has support for auto objectId increment and store management.
 * @export
 * @class StoreComponent
 * @extends {ShallowComponent}
 */
export default class StoreComponent extends ShallowComponent {


    /**
     * Components is a static variable which holds the count of successfull instances
     * extends StoreComponent
     * @static
     */
    static componentCount = 0;

    /**
     * Object id of the component given automaticly by
     * the StoreComponent at construction.
     */
    __objectId;


    /**
     * Type definition of properties
     * @static
     */
    static propTypes = {
        /**
         * bind store to the component
         */
        store: React.PropTypes.object,
        /**
         * bind stores array to the component
         */
        stores: React.PropTypes.array
    };

    /**
     * Check store or stores property.
     * @param props
     */
    static checkAndGetStore(parent: StoreComponent, props: Object): Array<BaseStore> {
        if (
            props === undefined || (
                (props.store === undefined || props.store === null) &&
                (props.stores === undefined || props.stores.length === 0)
            )
        ) {
            throw new Error(`Must defined at least one store in a ${parent.constructor.name}`);
        }
        if (props.store && props.stores) {
            throw new Error(`Store must assign 'store' as object or 'stores' as array and pass as props to the ${this.constructor.name} component`);
        }
        return props.store ? [props.store] : props.stores;
    }

    /**
     * Store array of the component.
     */
    stores = [];

    /**
     * Creates an instance of StoreComponent.
     *
     * @param {Object} props
     */
    constructor(props: Object) {
        super(props);
        this.stores = StoreComponent.checkAndGetStore(this, props);
        this.__objectId = StoreComponent.componentCount++;
    }

    /**
     * Returns objectId of component.
     * @return {number} id
     */
    getObjectId(): number {
        return this.__objectId;
    }
    /**
     * return the stores array
     * @returns {Array<BaseStore>}
     */
    /**
     * Returns store array of the component
     * @returns {Array<BaseStore>}
     */
    getStores(): Array<BaseStore> {
        return this.stores;
    }

    /**
     * Return first item of the stores array
     * @returns {Store} first item of stores
     */
    getStore(): BaseStore {
        return this.stores[0];
    }

    /**
     * Triggers components state change.
     * @param {Store} that updates component.
     */
    triggerChange(store: BaseStore) {
        throw new Error(`${store.getName()} store couldn't set to the ${this.getName()} component. Trigger change must be implemented by ${this.getName()} component`);
    }

    /**
     * Triggered after component mounted to the DOM. Registers itself to the all its stores.
     */
    componentDidMount() {
        for (let i = 0; i < this.stores.length; i++) {
            this.stores[i].register(this);
        }
    }
    /**
     * Triggered before component unmount from the DOM. Unregisters itself to the all its stores.
     */
    componentWillUnmount() {
        for (let i = 0; i < this.stores.length; i++) {
            this.stores[i].unRegister(this);
        }
    }
}
