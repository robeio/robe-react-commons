import Assertions from "../utils/Assertions";
import MapArray from "../collections/MapArray";
import BaseStore from "./BaseStore";

/**
 * Base of Store to keep data and to trigger dependencies component.
 */
export default class Store extends BaseStore {

    __dataMap;
    onSuccess;
    onError;
    /* eslint-disable no-useless-constructor */
    constructor(props: Object) {
        super(props);
        Assertions.isNotUndefined(this.__props.endPoint, true);

        if (Assertions.isFunction(props.onSuccess)) {
            this.onSuccess = props.onSuccess;
        }
        if (Assertions.isFunction(props.onError)) {
            this.onError = props.onError;
        }
        this.__dataMap = new MapArray([], this.__props.idField);
    }

    setReadUrl(url: string): string {
        this.__props.endPoint.setReadUrl(url);
    }

    /**
     *
     * @param successCallBack
     * @param errorCallback
     * @param queryParams
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
    __updateSuccessCallback(successCallback: Function): Function {
        return (result: Object) => {
            this.__dataMap.replace(result.data);
            this.setResult(this.__dataMap.getData(), this.__props.result.totalCount);
            this._onSuccess("update", result, successCallback);
        };
    }
    /**
     *
     * @param newItem
     * @param successCallback
     * @param errorCallback
     */
    update(newItem: Map, successCallback: Function, errorCallback: Function): boolean {
        return (
            this.__props.endPoint.update(
                newItem,
                this.__props.idField,
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
        } else if (this.onSuccess !== undefined) {
            this.onSuccess(result, operator);
        }
        this.__error = null;
        this._dispatchChanges();
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
        return (error: string) => {
            if (errorCallback) {
                errorCallback(error);
            } else if (this.onError !== undefined) {
                this.onError(error, operator);
            }
        };
    }
}
