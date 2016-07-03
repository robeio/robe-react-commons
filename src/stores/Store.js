import StoreShallowComponent from "../components/StoreShallowComponent";
import Maps from "../utils/Maps";
import Assertions from "../utils/Assertions";
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
    ___components: Object = {};

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
        Assertions.isNotUndefined(props.endPoint, true);
        this.__props = props;
        this.__props.objectId = Store.storeCount++;

        if (!this.__props.importer) {
            this.__props.importer = (response: any): any => {
                return response;
            };
        } else {
            Assertions.isFunction(this.__props.importer,true);
        }

        if (!this.__props.idField) {
            this.__props.idField = "oid";
        }

        if (!this.__props.autoLoad) {
            this.__props.autoLoad = false;
        }

        if (this.__props.autoLoad === true) {
            this.read(this.__props.onSuccess, this.__props.onError);
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
        Assertions.isNotUndefined(component, true);
        this.___components[component.getObjectId()] = component;
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
        Assertions.isNotUndefined(component, true);
        delete this.___components[component.getObjectId()];
        if (Object.keys(this.___components).length === 0) {
            setTimeout(this.__disposeContent, 1500);
        }
        return Object.keys(this.___components).length;
    }

    triggerChanges = () => {
        Maps.forEach(this.___components, (component: StoreShallowComponent) => {
            this.triggerChange(component);
        });
    }
    triggerChange = (component: StoreShallowComponent) => {
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
            successCallback(result);
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
                errorCallback(errorCode, error);
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


    /**
     *
     * @param successCallBack
     * @param errorCallback
     * @param offset
     * @param limit
     * @param query
     * @param filter
     * @param fields
     * @returns {boolean|*}
     */
    read(successCallBack: Function, errorCallback: Function, offset: string, limit: string, query: string, filter: string, fields: string): boolean {
        return (
            this.__props.endPoint.read(
                offset,
                limit,
                query,
                filter,
                fields,
                this.__readSuccessCallback(successCallBack),
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
            this.__result.dataMap.add(result.data);
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
            this.__result.dataMap.replace(oldItem, result.data);
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
                newItem,
                this.__props.idField,
                this.__updateSuccessCallback(oldItem, successCallback),
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
            this.__result.dataMap.remove(result.data);
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
                this.__props.idField,
                this.__deleteSuccessCallback(successCallback),
                this.__errorCallBack("delete", errorCallback)
            )
        );
    }


    __disposeContent = () => {
        if (Object.keys(this.___components).length === 0) {
            // TODO: Do all stuff
        }
    };
}
