import Application from "../application/Application";
import AjaxRequest from "../connections/AjaxRequest";

export default class RemoteEndPoint {
    static errorStatusMap = {
        400: "Server understood the request, but request content was invalid.",
        401: "Unauthorized access.",
        403: "Forbidden resource can't be accessed.",
        404: "The requested page not found.",
        500: "Internal server error.",
        503: "Service unavailable.",
        422: "The request was well-formed but was unable to be followed due to semantic errors"
    };

    __url;
    _readRequest;
    _createRequest;
    _updateRequest;
    _deleteRequest;

    constructor(props: Object) {
        this.__url = Application.getUrl(props.url);

        this._readRequest = new AjaxRequest({
            url: this.__url,
            type: "GET"
        });
        this._createRequest = new AjaxRequest({
            url: this.__url,
            type: "POST"
        });
        this._updateRequest = new AjaxRequest({
            url: this.__url,
            type: "PUT"
        });
        this._deleteRequest = new AjaxRequest({
            url: this.__url,
            type: "DELETE"
        });
    }

    read(offset: string, limit: string, query: string, filter: string, fields: string, successCallBack: Function, errorCallback: Function): boolean {
        let queryParams = {
            offset: offset,
            limit: limit,
            query: query,
            filter: filter,
            fields: fields
        };
        let onSuccess = (data: Object, textStatus: string, xhr: Object) => {
            let result = {
                data: data,
                totalCount: parseInt(xhr.getResponseHeader("X-Total-Count"), 10) || 0
            };
            successCallBack(result);
        };

        return this._readRequest.call(undefined, queryParams, onSuccess, this.__createOnError(errorCallback));
    }

    create(item: Map, successCallback: Function, errorCallback: Function): boolean {
        let onSuccess = (data: Object) => {
            let result = {
                data: data,
                totalCount: 1
            };
            successCallback(result);
        };

        return this._createRequest.call(item, undefined, onSuccess, this.__createOnError(errorCallback));
    }

    update(newItem: Map, successCallback: Function, errorCallback: Function) {
        let onSuccess = (data: Object) => {
            let result = {
                data: data,
                totalCount: 1
            };
            successCallback(result);
        };

        this._updateRequest.call(newItem, undefined, onSuccess, this.__createOnError(errorCallback));
    }

    delete(item: Map, successCallback: Function, errorCallback: Function) {
        let onSuccess = (data: Object) => {
            let result = {
                data: data,
                totalCount: 1
            };
            successCallback(result);
        };
        this._deleteRequest.call(item, undefined, onSuccess, this.__createOnError(errorCallback));
    }

    getUrl(): string {
        return this.__url;
    }

    __createOnError(errorCallback: Function): Function {
        return (xhr: Object) => {
            errorCallback(xhr.status, xhr.responseJSON.details);
        };
    }
}
