import jajax from "robe-ajax";
import Maps from "../utils/Maps";
import QueryParams from "./QueryParams";
import Application from "../application/Application";

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
        Maps.mergeDeep(props, this.props);
        this.__url = Application.getUrl(props.url);
    }

    setUrl(url: string): string {
        this.__url = Application.getUrl(url);
    }

    /**
     * Makes an ajax call with the given data,query parameters and callback functions
     * @param {Object} data to serialize and send.
     * @param {Object} queryParams parameter map for the rest api.
     * @param {Function} success callback for the ajax request.
     * @param {Function} error callback for the ajax request.
     */
    call = (data: Object, queryParams: Object, success: Function, error: Function, pathParams: Array<string>) => {
        this.props.success = success !== undefined ? success : undefined;
        this.props.error = error !== undefined ? error : undefined;
        if (data !== undefined) {
            this.props.data = JSON.stringify(data);
        } else {
            delete this.props.data;
        }
        this.props.url = this.__url;

        if (pathParams !== undefined) {
            this.props.url = `${this.__url}/${pathParams.join("/")}`;
        }

        if (queryParams !== undefined) {
            this.props.url = QueryParams.stringify(queryParams, this.props.url);
        }

        return jajax.ajax(this.props);
    };
}
