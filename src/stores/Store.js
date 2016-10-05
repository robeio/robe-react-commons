import Assertions from "../utils/Assertions";
import MapArray from "../collections/MapArray";
import BaseStore from "./BaseStore";

/**
 * Base of Store to keep data and to trigger dependencies component.
 */
export default class Store extends BaseStore {

    __dataMap;

    /* eslint-disable no-useless-constructor */
    constructor(props: Object) {
        super(props);
        Assertions.isNotUndefined(this.__props.endPoint, true);
    }

    /**
     * load called from BaseStore
     * @param onSuccess
     * @param onError
     */
    load(onSuccess: Function, onError: Function) {
        this.read(onSuccess, onError);
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
    read(successCallBack: Function, errorCallback: Function, queryParams: Object): boolean {
        return (
            this.__props.endPoint.read(
                queryParams,
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
    __readSuccessCallback(successCallback: Function): Function {
        return (result: Object) => {
            this.__dataMap = new MapArray(result.data, this.__props.idField);
            this.setResult(this.__dataMap.getData(), result.totalCount);
            this._onSuccess("read", result, successCallback);
        };
    }

    /**
     *
     * @param {string} operator
     * @param {Function} errorCallback
     * @returns {Function}
     * @private
     */
    __errorCallBack(operator: string, errorCallback: Function): Function {
        return (error: string) => {
            if (errorCallback) {
                errorCallback(error);
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
    __createSuccessCallback(successCallback: Function): Function {
        return (result: Object) => {
            this.__dataMap.add(result.data);
            this.setResult(this.__dataMap.getData(), this.__props.result.totalCount + 1);
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
            this.__dataMap.replace(oldItem, result.data);
            this.setResult(this.__dataMap.getData(), this.__props.result.totalCount);
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
            this.__dataMap.remove(result.data);
            this.setResult(this.__dataMap.getData(), this.__props.result.totalCount - 1);
            this._onSuccess("delete", this.__props.result, successCallback);
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
        this._dispatchChanges();
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
    _onError(operator: string, error: Map): boolean {
        this.__error = error;
        return true;
    }
}
