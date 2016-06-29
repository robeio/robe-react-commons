import jajax from "jajax";
import Maps from "../utils/Maps";

export default class AjaxRequest {
    url;

    props: Object = {
        type: "POST",
        dataType: "json",
        error: this.onError,
        complete: this.onComplete,
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        async: true,
        crossDomain: true
    };

    constructor(props: Object) {
        Maps.merge(props, this.props);
        this.url = this.props.url;
    }

    call = (data: Object, queryParams: Object, complete: Function, error: Function) => {
        this.props.complete = complete !== undefined ? complete : this.onComplete;
        this.props.error = error !== undefined ? error : this.onError;
        if (data !== undefined) {
            this.props.data = JSON.stringify(data);
        } else {
            delete this.props.data;
        }

        if (queryParams !== undefined) {
            this.props.url = this.parseQueryParams(queryParams);
        }

        jajax.ajax(this.props);
    };

    onError = (xhr: Object, errorThrown: Object) => {

    };
    onComplete = (xhr: Object) => {

    };

    parseQueryParams = (queryParams: Object): string => {
        let { offset, limit, query, filter, fields } = queryParams;

        let url = this.url;
        let hasOffset = offset !== undefined;
        let hasLimit = limit !== undefined;
        let hasQuery = query !== undefined;
        let hasFilter = filter !== undefined;
        let hasFields = fields !== undefined;


        if (hasOffset) {
            url += (`${this.getQParamPrefix(url)}_offset=${offset}`);
        }

        if (hasLimit) {
            url += (`${this.getQParamPrefix(url)}_limit=${limit}`);
        }

        if (hasQuery) {
            url += (`${this.getQParamPrefix(url)}_q=${query}`);
        }
        if (hasFilter) {
            url += (`${this.getQParamPrefix(url)}_filter=${filter}`);
        }
        if (hasFields) {
            url += (`${this.getQParamPrefix(url)}_fields=${fields}`);
        }

        return url;
    };
    getQParamPrefix = (url: string) => {
        let firstElement = url.indexOf("?") === -1;
        return firstElement ? "?" : "&";
    };

}
