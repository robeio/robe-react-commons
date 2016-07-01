import jajax from "jajax";
import Maps from "../utils/Maps";


/**
 * An ajax request class. Helps organising multiple calls with the same properties.
 * @export
 * @class AjaxRequest
 */
export default class AjaxRequest {
    /**
     * Original URL of the request.
     */
    __url;

    /**
     * Default properties for a jquary ajax call.
     * @type {Object}
     */
    props: Object = {
        type: "POST",
        dataType: "json",
        error: this.onError,
        success: this.onSuccess,
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        async: true,
        crossDomain: true
    };

    /**
     * Creates an instance of AjaxRequest.
     *
     * @param {Object} props
     */
    constructor(props: Object) {
        Maps.merge(props, this.props);
        this.__url = this.props.url;
    }

    /**
     * Makes an ajax call with the given data,query parameters and callback functions
     * @param {Object} data to serialize and send.
     * @param {Object} queryParams parameter map for the rest api.
     * @param {Function} success callback for the ajax request.
     * @param {Function} error callback for the ajax request.
     */
    call = (data: Object, queryParams: Object, success: Function, error: Function) => {
        this.props.complete = success !== undefined ? success : undefined;
        this.props.error = error !== undefined ? error : undefined;
        if (data !== undefined) {
            this.props.data = JSON.stringify(data);
        } else {
            delete this.props.data;
        }

        if (queryParams !== undefined) {
            this.props.url = this.serializeQueryParams(queryParams);
        }

        jajax.ajax(this.props);
    };


    /**
     * Serializes  query parameter map and merges with the url.
     * @param {Object} queryParams parameter map.
     * @return {string} url with the query parameters.
     */
    serializeQueryParams = (queryParams: Object): string => {
        let { offset, limit, query, filter, fields } = queryParams;

        let url = this.__url;
        let hasOffset = offset !== undefined;
        let hasLimit = limit !== undefined;
        let hasQuery = query !== undefined;
        let hasFilter = filter !== undefined;
        let hasFields = fields !== undefined;


        if (hasOffset) {
            url += (`${this.__getQParamPrefix(url)}_offset=${offset}`);
        }

        if (hasLimit) {
            url += (`${this.__getQParamPrefix(url)}_limit=${limit}`);
        }

        if (hasQuery) {
            url += (`${this.__getQParamPrefix(url)}_q=${query}`);
        }
        if (hasFilter) {
            url += (`${this.__getQParamPrefix(url)}_filter=${filter}`);
        }
        if (hasFields) {
            url += (`${this.__getQParamPrefix(url)}_fields=${fields}`);
        }

        return url;
    };
    /**
     * Returns query parameter prefix.
     * @param {string} url to check.
     * @return "?" if it is the first parameter of the url , else "&"
     * @private
     */
    __getQParamPrefix = (url: string): string => {
        let firstElement = url.indexOf("?") === -1;
        return firstElement ? "?" : "&";
    };
}
