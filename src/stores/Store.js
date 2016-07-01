import StoreShallowComponent from "../components/StoreShallowComponent";
import Maps from "../utils/Maps";
import StoreManager from "../managers/StoreManager";
import MapArray from "../collections/MapArray";

/**
 * Base of Store to keep data and to trigger dependencies component.
 */
export default class Store {

    /*
     * A result which holds default totalCount and data to return if store not initialize
     */
    static defaultResult = {
        data: [],
        totalCount: 0
    };

    /**
     * A number which is defines to generate unique id for store
     * @type {number}
     */
    static storeCount = 0;
    /**
     * A Map which holds last result of operations. It includes totalCount and data
     * @type {Object}
     */
    __result: Object;
    /**
     * An number which holds error code of the last operation.
     * @type {number}
     */
    __errorCode: number;
    /**
     * A number which holds error message of the last operation.
     * @type {string}
     */
    __error: string;
    /**
     * A Map which holds properties of the store.
     * @type {Object}
     */
    __props: Object;
    /**
     * A Map which holds registered components to the store.
     * @type {{Object}}
     * @protected
     */
    _registeredComponents: Object = {};

    /**
     * Example props parameter
     * <pre><code>
     super({
            endPoint: new EndPoint({
                url: "menus"
            }),
            id: "newStore",
            autoLoad: true
        });
     ]
     * </code></pre>
     * @param {Object} props
     */
    constructor(props: Object) {
        this.__props = props;
        this.__props.objectId = Store.storeCount++;

        if (!props.key) {
            this.__props.key = this.constructor.name;
        }

        if (!props.importer) {
            this.__props.importer = (response: any): any => {
                return response;
            };
        }

        if (!this.__props.idField) {
            this.__props.idField = "oid";
        }

        StoreManager.registerStore(this);
        if (props.autoLoad) {
            this.read(props.onSuccess, props.onError);
        }
    }

    /**
     * Return A Map which holds properties for the store.
     * @returns {Object}
     */
    getProps = (): Object => {
        return this.__props;
    }

    /**
     * Return A Map which holds properties for the store.
     * @returns {Object}
     */
    getObjectId = (): number => {
        return this.__props.objectId;
    }

    /**
     * Store Class name
     * @returns {string}
     */
    getName = (): string => {
        return this.constructor.name;
    }

    /**
     * given id or StoreClassName to set data to the depend components state as key
     * @returns {string|string|*}
     */
    getKey = (): string => {
        return this.__props.key;
    }

    /**
     *
     *
     * @returns {object}
     */
    getResult = (): Object => {
        if (this.__result) {
            return {
                data: this.__result.dataMap.getData(),
                totalCount: this.__result.totalCount
            };
        }
        return Store.defaultResult;
    }

    /**
     *
     * @param component
     * @param key
     */
    register = (component: StoreShallowComponent) => {
        this._registeredComponents[component.getObjectId()] = component;
        if (this.__data) {
            this.triggerChange(component);
        }
    }
    /**
     *
     * @param id
     * @param component
     * @param key
     * @returns {*}
     */
    unRegister = (component: StoreShallowComponent): number => {
        delete this._registeredComponents[component.getObjectId()];
        // TODO Map length olmayabilir kontrol edilmeli.
        return this._registeredComponents.length;
    }

    triggerChanges = (): void => {
        Maps.forEach(this._registeredComponents, (component) => {
            this.triggerChange(component);
        });
    }
    triggerChange = (component: StoreShallowComponent): void => {
        component.triggerChange(this);
    }

    /**
     *
     * @param {string} operator
     * @param {Map} result
     * @returns {boolean}
     * @protected
     */
    _onSuccess(operator: string, result: Map, successCallback: Function): boolean {
        if (successCallback) {
            successCallback.apply(this, result);
        }
        this.__error = null;
        this.__errorCode = null;
        this.triggerChanges();
        return true;
    }

    /**
     *
     * @param {string} operator
     * @param {number} errorCode
     * @param {string} error
     * @returns {boolean}
     * @protected
     */
    _onError(operator: string, errorCode: number, error: string): boolean {
        this.__errorCode = errorCode;
        this.__error = error;
        return true;
    }

    /**
     *
     * @param {string} operator
     * @param {Function} errorCallback
     * @returns {Function}
     * @private
     */
    __errorCallBack(operator: string, errorCallback: Function): Function {
        return (errorCode: number, error: string) => {
            if (errorCallback) {
                errorCallback.apply(this, errorCode, error);
            }
        };
    }
    /**
     *
     * @param {string} operator
     * @param {Function} successCallback
     * @returns {Function}
     * @private
     */
    __readSuccessCallback(successCallback: Function): Function {
        return (result: Object) => {
            this.__result = {
                dataMap: new MapArray(result.data, this.__props.idField),
                totalCount: result.totalCount
            };
            this._onSuccess("read", result, successCallback);
        };
    }


    read(successCallback: Function, errorCallback: Function, _offset: string, _limit: string, _query: string, code: string, value: string, fields: string): boolean {
        return (
            this.__props.endPoint.read(
                _offset,
                _limit,
                _query,
                code,
                value,
                fields,
                this.__readSuccessCallback(successCallback),
                this.__errorCallBack("read", errorCallback)
        ));
    }
    /**
     *
     * @param {string} operator
     * @param {Function} successCallback
     * @returns {Function}
     * @private
     */
    __createSuccessCallback(successCallback: Function): Function {
        return (result: Object) => {
            this.__result.dataWrapper.add(result.data);
            this._onSuccess("create", result, successCallback);
        };
    }
    /**
     *
     * @param item
     * @param successCallback
     * @param errorCallback
     */
    create(item: Map, successCallback: Function, errorCallback: Function): boolean {
        return (
           this.__props.endPoint.create(
               item,
               this.__createSuccessCallback(successCallback),
               this.__errorCallBack("create", errorCallback)
            )
        );
    }

    /**
     *
     * @param {string} operator
     * @param {Function} successCallback
     * @returns {Function}
     * @private
     */
    __updateSuccessCallback(oldItem: Map, successCallback: Function): Function {
        return (result: Object) => {
            this.__result.dataWrapper.replace(oldItem, result.data);
            this._onSuccess("update", result, successCallback);
        };
    }
    /**
     *
     * @param oldItem
     * @param newItem
     * @param successCallback
     * @param errorCallback
     */
    update(oldItem: Map, newItem: Map, successCallback: Function, errorCallback: Function): boolean {
        return (
            this.__props.endPoint.update(
                oldItem,
                newItem,
                this.__updateSuccessCallback(successCallback),
                this.__errorCallBack("update", errorCallback)
            )
        );
    }

    /**
     *
     * @param {string} operator
     * @param {Function} successCallback
     * @returns {Function}
     * @private
     */
    __deleteSuccessCallback(successCallback: Function): Function {
        return (result: Object) => {
            this.__result.dataWrapper.remove(result.data);
            this.__result.totalCount -= this.result.totalCount;
            this._onSuccess("delete", result, successCallback);
        };
    }
    /**
     *
     * @param item
     * @param successCallback
     * @param errorCallback
     */
    delete(item: Map, successCallback: Function, errorCallback: Function): boolean {
        return (
            this.__props.endPoint.delete(
                item,
                this.__deleteSuccessCallback(successCallback),
                this.__errorCallBack("delete", errorCallback)
            )
        );
    }
}
