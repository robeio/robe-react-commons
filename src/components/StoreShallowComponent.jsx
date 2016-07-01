import React from "react";
import ShallowComponent from "./ShallowComponent";
import StoreManager from "../managers/StoreManager";
import Store from "../stores/Store";
/**
 * A component which extends React.Component and implements shouldComponentUpdate with using shallowCompare.
 */
export default class StoreShallowComponent extends ShallowComponent {


    static componentCount = 0;
    __objectId;

    /**
     * stores kep stores
     * @type {{stores: array }}
     */
    static propTypes = {
        stores: React.PropTypes.array.isRequired
    };
    /**
     *
     * @type {{}}
     */
    stores = {};

    /**
     *
     * @param props
     */
    constructor(props: Object) {
        super(props);
        this.__objectId = ShallowComponent.componentCount++;
        if (!this.props.stores || !this.props.stores.length === 0) {
            throw new Error(`Must defined at least one store in a ${this.constructor.name}`);
        }
        this.stores = this.props.stores;
    }

    /**
     * return uniqueId for the StoreShallowComponent
     */
    getObjectId = (): number => {
        return this.__objectId;
    }
    /**
     * return the stores array
     * @returns {Array<Store>}
     */
    getStores(): Array<Store> {
        return this.stores;
    }

    /**
     * return first element of the stores array
     * @returns {Store}
     */
    getStore(): Store {
        return this.stores[0];
    }

    /**
     * @param {Store} store
     */
    triggerChange = (store: Store) => {
        let state = {};
        state[store.getKey()] = store.getResult();
        this.setState(state);
    }

    /**
     *
     */
    componentDidMount() {
        StoreManager.registerComponent(this);
    }
    componentWillUnMount() {
        StoreManager.unRegisterComponent(this);
    }
}
