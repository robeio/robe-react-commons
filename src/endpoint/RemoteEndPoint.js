import Application from "../application/Application";
import AjaxRequest from "../connections/AjaxRequest";
import HttpError from "../connections/HttpError";
import Assertions from "../utils/Assertions";
import Maps from "../utils/Maps";

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["__createOnError"] }] */

export default class RemoteEndPoint {

    _transport;
    _readRequest;
    _createRequest;
    _updateRequest;
    _deleteRequest;

    constructor(props: Object) {
        this._transport = {};

        if (Assertions.isString(props.url)) {
            this._transport.url = Application.getUrl(props.url);
        }

        let defaultProps = {
            url: this._transport.url,
            read: {
                type: "GET",
                url: this._transport.url,
                dataType: props.dataType || "json",
                contentType: props.contentType || "application/json; charset=utf-8"
            },
            create: {
                type: "POST",
                url: this._transport.url,
                dataType: props.dataType || "json",
                contentType: props.contentType || "application/json; charset=utf-8"
            },
            update: {
                type: "PUT",
                url: this._transport.url,
                dataType: props.dataType || "json",
                contentType: props.contentType || "application/json; charset=utf-8"
            },
            delete: {
                type: "DELETE",
                url: this._transport.url,
                dataType: props.dataType || "json",
                contentType: props.contentType || "application/json; charset=utf-8"
            }
        };

        if (props.read) {
            defaultProps.read = Maps.mergeDeep(props.read, defaultProps.read);
            if (props.read.url) {
                defaultProps.read.url = Application.getUrl(defaultProps.read.url);
            }
        }
        if (props.create) {
            defaultProps.create = Maps.mergeDeep(props.create, defaultProps.create);
            if (props.create.url) {
                defaultProps.create.url = Application.getUrl(defaultProps.create.url);
            }
        }
        if (props.update) {
            defaultProps.update = Maps.mergeDeep(props.update, defaultProps.update);
            if (props.update.url) {
                defaultProps.update.url = Application.getUrl(defaultProps.update.url);
            }
        }
        if (props.delete) {
            defaultProps.delete = Maps.mergeDeep(props.delete, defaultProps.delete);
            if (props.delete.url) {
                defaultProps.delete.url = Application.getUrl(defaultProps.delete.url);
            }
        }

        this._readRequest = new AjaxRequest(defaultProps.read);
        this._createRequest = new AjaxRequest(defaultProps.create);
        this._updateRequest = new AjaxRequest(defaultProps.update);
        this._deleteRequest = new AjaxRequest(defaultProps.delete);

        this._transport = defaultProps;
    }

    read(queryParams: Object, successCallBack: Function, errorCallback: Function): boolean {
        let onSuccess = (data: Object, textStatus: string, xhr: Object) => {
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

    create(item: Map, successCallback: Function, errorCallback: Function): boolean {
        let onSuccess = (data: Object) => {
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

    update(newItem: Map, idField: string, successCallback: Function, errorCallback: Function) {
        let onSuccess = (data: Object) => {
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

    delete(item: Map, idField: string, successCallback: Function, errorCallback: Function) {
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

    getUrl(): string {
        return this._transport.url;
    }
    setReadUrl(url: string): string {
        this._readRequest.setUrl(url);
    }

    __createOnError(errorCallback: Function): Function {
        return (xhr: Object, exception: string) => {
            let error = HttpError.parse(xhr, exception);
            errorCallback(error);
        };
    }
}
