import Assertions from "../utils/Assertions";
import StoreShallowComponent from "../components/StoreShallowComponent";
import SuperStore from "../stores/Store";

/**
 *
 */
class StoreManager {
    /**
     * Store Map keep stores by Store Class Name as Store Map by storeId
     * @type {{}}
     * @private
     */
    __stores = {};

    /**
     *
     * @param {SuperStore} store
     */
    registerStore = (store: SuperStore): void => {
        if (!this.__stores[store.getObjectId()]) {
            this.__stores[store.getObjectId()] = store;
        }
    }

    /**
     *
     * @param {SuperStore} store
     */
    unRegisterStore = (store: SuperStore): void => {
        if (this.__stores[store.getObjectId()]) {
            delete this.__stores[store.getObjectId()];
        }
    }


    /**
     * @param objectId
     */
    unRegisterStoreByObjectId(objectId: number): void {
        if (this.__stores[objectId]) {
            delete this.__stores[objectId];
        }
    }

    /**
     *
     * @param {number} objectId
     * @returns {*}
     */
    getStoreByObjectId(objectId: number): SuperStore {
        return this.__stores[objectId];
    }
    /**
     *
     * @param {StoreShallowComponent} component
     */
    registerComponent = (component: StoreShallowComponent): void => {
        Assertions.isNotUndefined(component, true);
        let stores: Array<SuperStore> = component.getStores();
        for (let i = 0; i < stores.length; i++) {
            let store: SuperStore = stores[i];
            this.registerStore(store);
            /*
            if (!this.__stores[store.getObjectId()]) {
                throw new Error(`${store.getName()} is not registered to the StoreManager`);
            }
            */
            store.register(component);
        }
    }
    /**
     *
     * @param {StoreShallowComponent} component
     */
    unRegisterComponent = (component: StoreShallowComponent): void => {
        Assertions.isNotUndefined(component, true);
        let stores = component.getStores();
        for (let i = 0; i < stores.length; i++) {
            let store = stores[i];

            if (!this.__stores[store.getObjectId()]) {
                throw new Error(`${store.getName()} is not registered to the StoreManager`);
            }
            let registeredComponentCount = store.unRegister(component);
            if (!store.keepAlive && registeredComponentCount === 0) {
                this.unRegisterStore(store);
            }
        }
    }
}

export default new StoreManager();
