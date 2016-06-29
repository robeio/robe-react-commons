import jajax from "jajax";
import Maps from "../utils/Maps";

export default class AjaxRequest {
    __url;

    __props: Object = {
        type: "POST",
        dataType: "json",
        error: this.__onError,
        complete: this.__onComplete,
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        async: true,
        crossDomain: true
    };

    constructor(props: Object) {
        Maps.merge(props, this.__props);
        this.__url = this.__props.url;
    }

    call = (data: Object, queryParams: Object, complete: Function, error: Function) => {
        this.__props.complete = complete !== undefined ? complete : this.__onComplete;
        this.__props.error = error !== undefined ? error : this.__onError;
        if (data !== undefined) {
            this.__props.data = JSON.stringify(data);
        } else {
            delete this.__props.data;
        }

        if (queryParams !== undefined) {
            this.__props.url = this.__parseQueryParams(queryParams);
        }

        jajax.ajax(this.__props);
    };

    __onError = (xhr: Object, errorThrown: Object) => {
        console.error(xhr, errorThrown);
    };
    __onComplete = (xhr: Object) => {
        console.error(xhr);
    };

    __parseQueryParams = (queryParams: Object) => {
        let { _offset, _limit, _query, _filter, _fields } = queryParams;

        let url = this.__url;
        let hasOffset = _offset !== undefined;
        let hasLimit = _limit !== undefined;
        let hasQuery = _query !== undefined;
        let hasFilter = _filter !== undefined;
        let hasFields = _fields !== undefined;


        if (hasOffset) {
            url += (`${this.__getQParamPrefix(url)}_offset=${_offset}`);
        }

        if (hasLimit) {
            url += (`${this.__getQParamPrefix(url)}_limit=${_limit}`);
        }

        if (hasQuery) {
            url += (`${this.__getQParamPrefix(url)}_q=${_query}`);
        }
        if (hasFilter) {
            url += (`${this.__getQParamPrefix(url)}_filter=${_filter}`);
        }
        if (hasFields) {
            url += (`${this.__getQParamPrefix(url)}_fields=${_fields}`);
        }

        return url;
    };
    __getQParamPrefix = (url: string) => {
        let firstElement = url.indexOf("?") === -1;
        return firstElement ? "?" : "&";
    };

}
