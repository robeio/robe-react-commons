import jajax from "jajax";

class RequestUtils {

    makeRequest(
        path: string,
        type: string,
        data: Object,
        complete: Function,
        success: Function,
        error: Function, async: Function) {
        if (async === undefined) {
            async = true;
        }
        let props = {
            type: type,
            dataType: "json",
            error: (jqXHR: Object, errorThrown: Object) => {
                this.__handleError(jqXHR, errorThrown, error);
            },
            // beforeSend: function (jqXHR , settings) {
            beforeSend: (jqXHR: Object) => {
                jqXHR.path = path;
            },
            url: window.backendRootPath + path,
            contentType: "application/json; charset=utf-8",
            xhrFields: {
                withCredentials: true
            },
            async: async,
            crossDomain: true
        };
        if (data) {
            props.data = JSON.stringify(data);
        }
        if (complete) {
            props.complete = complete;
        }
        if (success) {
            props.success = success;
        }
        jajax.ajax(props);
    }

    __handleError(jqXHR: Object, errorThrown: Object, error: Function) {
        if (jqXHR.status === 401) {
            if (jqXHR.path !== "menus/user") {
                window.location.reload();
            }
        } else if (jqXHR.status === 403) {
            //    NotificationManager.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
        } else {
            if (error) {
                error(jqXHR, errorThrown);
            }
        }
    }
}

export default new RequestUtils();
