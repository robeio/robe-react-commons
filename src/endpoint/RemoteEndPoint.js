import Application from "../application/Application";
import AjaxRequest from "../connections/AjaxRequest";
import HttpError from "../connections/HttpError";
import Assertions from "../utils/Assertions";
import Maps from "../utils/Maps";

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["__createOnError"] }] */

export default class RemoteEndPoint {

    __url;
    _readRequest;
    _createRequest;
    _updateRequest;
    _deleteRequest;

    constructor(props : Object) {
        let defaultProps = {};
        
        if (Assertions.isString(props.url)) {
            this.__url = Application.getUrl(props.url);
            defaultProps = {
                read: {
                    type: "GET",
                    url: this.__url
                },
                create: {
                    type: "POST",
                    url: this.__url
                },
                update: {
                    type: "PUT",
                    url: this.__url
                },
                delete: {
                    type: "DELETE",
                    url: this.__url
                }
            };

            this._readRequest = new AjaxRequest(defaultProps.read);
            this._createRequest = new AjaxRequest(defaultProps.create);
            this._updateRequest = new AjaxRequest(defaultProps.update);
            this._deleteRequest = new AjaxRequest(defaultProps.delete);
        } else {
            defaultProps = {
                read: {
                    type: "GET",
                    url: this.__url
                },
                create: {
                    type: "POST",
                    url: this.__url
                },
                update: {
                    type: "PUT",
                    url: this.__url
                },
                delete: {
                    type: "DELETE",
                    url: this.__url
                }
            };
            this._readRequest = new AjaxRequest(Maps.mergeDeep(props.url.read, defaultProps.read));
            this._createRequest = new AjaxRequest(Maps.mergeDeep(props.url.create, defaultProps.create));
            this._updateRequest = new AjaxRequest(Maps.mergeDeep(props.url.update, defaultProps.update));
            this._deleteRequest = new AjaxRequest(Maps.mergeDeep(props.url.delete, defaultProps.delete));
            this.__url = defaultProps;
        }
    }

    read(queryParams : Object, successCallBack : Function, errorCallback : Function) : boolean {
        let onSuccess = (data : Object, textStatus : string, xhr : Object) => {
            let result = {
                data: data,
                totalCount: parseInt(xhr.getResponseHeader("X-Total-Count"), 10) || 0
            };
            successCallBack(result);
        };

        return this
            ._readRequest
            .call(undefined, queryParams, onSuccess, this.__createOnError(errorCallback));
    }

    create(item : Map, successCallback : Function, errorCallback : Function) : boolean {
        let onSuccess = (data : Object) => {
            let result = {
                data: data,
                totalCount: 1
            };
            successCallback(result);
        };
        return this
            ._createRequest
            .call(item, undefined, onSuccess, this.__createOnError(errorCallback));
    }

    update(newItem : Map, idField : string, successCallback : Function, errorCallback : Function) {
        let onSuccess = (data : Object) => {
            let result = {
                data: data,
                totalCount: 1
            };
            successCallback(result);
        };

        this
            ._updateRequest
            .call(newItem, undefined, onSuccess, this.__createOnError(errorCallback), [newItem[idField]]);
    }

    delete(item : Map, idField : string, successCallback : Function, errorCallback : Function) {
        let onSuccess = () => {
            let result = {
                data: item,
                totalCount: 1
            };
            successCallback(result);
        };
        this
            ._deleteRequest
            .call(item, undefined, onSuccess, this.__createOnError(errorCallback), [item[idField]]);
    }

    getUrl() : string { return this.__url; }

    __createOnError(errorCallback : Function) : Function {
        return (xhr : Object, exception : string) => {
            let error = HttpError.parse(xhr, exception);
            errorCallback(error);
        };
    }
}
