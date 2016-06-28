import jajax from "jajax";
import Maps from "utils/Maps";

export default class AjaxRequest {

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
    authCheckUrl


    constructor(props: Object) {
        Maps.merge(props, this.__props);
    }

    call = (data: Object): void => {
        // let props = {
        //     type: type,
        //     dataType: "json",
        //     error: (jqXHR: Object, errorThrown: Object) => {
        //         this.__handleError(jqXHR, errorThrown, error);
        //     },
        //     // beforeSend: function (jqXHR , settings) {
        //     beforeSend: (jqXHR: Object) => {
        //         jqXHR.path = path;
        //     },
        //     url: window.backendRootPath + path,
        //     contentType: "application/json; charset=utf-8",
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     async: async,
        //     crossDomain: true
        // };
        if (data) {
            this.__props.data = JSON.stringify(data);
        } else {
            delete this.__props.data;
        }
        console.log("calling");
        jajax.ajax(this.__props);
    };

    __onError = (xhr: Object, errorThrown: Object): void => {
        console.error(xhr, errorThrown);
    };
    __onComplete = (xhr: Object): void => {
        console.error(xhr);
    };
}
