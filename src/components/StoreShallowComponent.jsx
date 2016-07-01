import React from "react";
import ShallowComponent from "./ShallowComponent";
import StoreManager from "../managers/StoreManager";
import Store from "../stores/Store";
/**
 * A component which extends ShallowComponent and manages store operations.
 * Usually used for components with store operations.
 * Has support for auto objectId increment and store management.
 * @export
 * @class StoreShallowComponent
 * @extends {ShallowComponent}
 */
export default class StoreShallowComponent extends ShallowComponent {


    /**
     * Components is a static variable which holds the count of successfull instances
     * extends StoreShallowComponent
     * @static
     */
    static componentCount = 0;

    /**
     * Object id of the component given automaticly by
     * the StoreShallowComponent at construction.
     */
    __objectId;


    /**
     * Type definition of properties
     * @static
     */
    static propTypes = {
        stores: React.PropTypes.array.isRequired
    };

    /**
     * Store array of the component.
     */
    stores = [];

    /**
     * Creates an instance of StoreShallowComponent.
     *
     * @param {Object} props
     */
    constructor(props: Object) {
        super(props);
        if (!this.props || !this.props.stores || this.props.stores.length === 0) {
            throw new Error(`Must defined at least one store in a ${this.constructor.name}`);
        }
        this.__objectId = StoreShallowComponent.componentCount++;
        this.stores = this.props.stores;
    }

    /**
     * Returns objectId of component.
     * @return {number} id
     */
    getObjectId = (): number => {
        return this.__objectId;
    }
    /**
     * return the stores array
     * @returns {Array<Store>}
     */
    /**
     * Returns store array of the component
     * @returns {Array<Store>}
     */
    getStores(): Array<Store> {
        return this.stores;
    }

    /**
     * Return first item of the stores array
     * @returns {Store} first item of stores
     */
    getStore(): Store {
        return this.stores[0];
    }

    /**
     * Triggers components state change.
     * @param {Store} that updates component.
     */
    triggerChange = (store: Store) => {
        let state = {};
        state[store.getKey()] = store.getResult();
        this.setState(state);
    }

    /**
     * Triggered after component mounted to the DOM. Registers itself to the all its stores.
     */
    componentDidMount() {
        StoreManager.registerComponent(this);
    }
    /**
     * Triggered before component unmount from the DOM. Unregisters itself to the all its stores.
     */
    componentWillUnMount() {
        StoreManager.unRegisterComponent(this);
    }
}
