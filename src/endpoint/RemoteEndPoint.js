import Application from "../application/Application";
import AjaxRequest from "../connections/AjaxRequest";

export default class RemoteEndPoint {

    static errorMessageMap = {
        
    }

     static errorStatusMap = {
                "400" : "Server understood the request, but request content was invalid.",
                "401" : "Unauthorized access.",
                "403" : "Forbidden resource can't be accessed.",
                "404" : "The requested page not found.",
                "500" : "Internal server error.",
                "503" : "Service unavailable.",
                "422" : "The request was well-formed but was unable to be followed due to semantic errors"
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

    read(_offset: string, _limit: string, _query: string, code: string, value: string, fields: string, successCallBack: Function, errorCallback: Function): boolean {
        let queryParams = {
            _offset: _offset,
            _limit: _limit,
            _query: _query,
            code: code,
            value: value,
            fields: fields
        };

        //   let onSuccess = (xhr: Object, errorThrown: Object) => {
        let onSuccess = (xhr: Object) => {
            let result = {
                data: xhr.responseJSON,
                totalCount: parseInt(xhr.getResponseHeader("X-Total-Count"), 10) || 0
            };
            successCallBack(result);
        };

        //   let onError = (jqXHR: Object): void => {
        let onError = (jqXHR: Object): void => {
            errorCallback(jqXHR.status, jqXHR.statusText);
        };

        return this._readRequest.call(undefined, queryParams, onSuccess, onError);
    }
    
    create(item: Map, successCallback: Function, errorCallback: Function): boolean {
        // let onSuccess = (xhr: Object, errorThrown: Object) => {
        let onSuccess = (xhr: Object) => {
            let result = {
                data: xhr.responseJson,
                totalCount: 1
            };
            successCallback(result);
        };

        // let onError = (jqXHR, textStatus, errorThrown): void => {
        let onError = (jqXHR: Object): void => {
            errorCallback(jqXHR.status, jqXHR.responseJSON.details);
        };
        return this._createRequest.call(item, undefined, onSuccess, onError);
    }

    update(newItem:Map, successCallback: Function, errorCallback: Function) {
        // onSuccess = (xhr: Object, errorThrown: Object) => {
        let onSuccess = (xhr: Object) => {
            let result = {
                data: xhr.responseJson,
                totalCount: 1
            };
            successCallback(result);
        };
        // let onError = (jqXHR, textStatus, errorThrown): void => {
        let onError = (jqXHR): void => {
            errorCallback(jqXHR.status, jqXHR.responseJSON.details);
        };
        this._updateRequest.call(newItem, null, onSuccess, onError);
    }

    delete(item: Map, successCallback: Function, errorCallback: Function) {
        // let onSuccess = (data, textStatus, jqXHR) => {
        let onSuccess = (xhr: Object) => {
            let result = {
                data: xhr.responseJson,
                totalCount: 1
            };
            successCallback(result);
        };

        //  let onError = (jqXHR, textStatus, errorThrown): void => {
        let onError = (jqXHR: Object): void => {
            errorCallback(jqXHR.status, jqXHR.responseJSON.details);
        };

        this._deleteRequest.call(item, null, onSuccess, onError);
    }

    getUrl(): string {
        return this.url;
    }
    getError = (xhr: Object) => {
        let message: string;
        if (xhr.status) {
            message = RemoteEndPoint.errorStatusMap[xhr.status];
            if (!message) {
                message = xhr.responseText;
            }
        }
        /*
         else if (exception === "parsererror") {
                message = "Error.\nParsing JSON Request failed.";
        } else if (exception === "timeout") {
                message = "Request Time out.";
        } else if (exception === "abort") {
                message = "Request was aborted by the server";
        } else {
            message = "Unknown Error \n.";
        }
        */
        return {
            code: xhr.status,
            message: message
        };
    }
}
