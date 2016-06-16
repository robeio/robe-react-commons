import jajax from "jajax";
import { Objects, Maps, DataWrapper } from "../utils";

export default class BaseStore {

    static baseURLPrefix;

    // Ajax request properties
    _create = {
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        }
    };
    _read = {
        type: "GET",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        }
    };
    _update = {
        type: "PUT",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        }
    };
    _delete = {
        type: "DELETE",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        }
    };
    _data;
    _totalCount = 0;
    _registeredComponents = [];
    _importer = (response) => {
        return response;
    };
    __ajax = true;
    __idField = "oid";

    constructor(params) {
        if (params) {
            // Set base url
            if (params.url) {
                this._create.url = params.url;
                this._read.url = params.url;
                this._update.url = params.url;
                this._delete.url = params.url;
                // If different url comes for operations they will be in charge.
            }
            if (params.create) {
                Maps.merge(this._create, params.create);
            }
            if (params.read) {
                Maps.merge(this._read, params.read);
            }
            if (params.update) {
                Maps.merge(this._update, params.update);
            }
            if (params.delete) {
                Maps.merge(this._delete, params.delete);
            }
            if (params.importer) {
                this._importer = params.importer;
            }
            if (params.component && params.key) {
                this.register(params.component, params.key);
            }
            if (params.batch) {
                this.__ajax = params.batch;
            }
            if (params.idField) {
                this.__idField = params.idField;
            }
        }
    }

    registerAndRead = (id, component, key) => {
        this.register(id, component, key);
        this.read();
    }

    register = (id, component, key) => {
        this._registeredComponents.push({ id: id, component: component, key: key });
    }

    getUrl = () => {
        return this._read.url;
    };
    // unRegister = (id, component, key) => {
    unRegister = (id, component, key) => {
        for (let i = this._registeredComponents.length; i--;) {
            if (this._registeredComponents[i].id === id) {
                this._registeredComponents.splice(i, 1);
            }
        }
    }

    triggerChange = (component, key) => {
        try {
            let props = {};
            props[key] = this._data.get();
            component.setState(props);
            component.forceUpdate();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * refactoring
     */
    read = (_offset, _limit, _query, code, value, fields) => {
        let url = this._read.url;

        let hasFilter = url.indexOf("_filter");
        if (code && value) {
            url += `?_filter=${code}=${value}`;
            hasFilter = 1;
        }

        if (_offset) {
            url += hasFilter === -1 ? `?_offset=${_offset}` : `&_offset=${_offset}`;
        }

        if (_limit) {
            if (_offset || hasFilter !== -1) {
                url += `&_limit=${_offset}`;
            } else {
                url += `&_limit=${_limit}`;
            }

            if (_query) {
                if (_offset || _limit || hasFilter !== -1) {
                    url += (`&_q=${_offset}`);
                } else {
                    url += (`?_q=${_offset}`);
                }
            }
            if (fields) {
                if (hasFilter === -1) {
                    url += "?_fields=";
                } else {
                    url += "&_fields=";
                }
                for (let i = 0; i < fields.length; i++) {
                    url += `${fields[i].code},`;
                }
                url += url.toString();
                url = url.substring(0, url.length - 1);
            }

            if (_offset !== undefined || _limit !== undefined || _query !== undefined) {
                let props = {
                    success: this.__readSuccess,
                    error: this.__onError,
                    url: url,
                    type: this._read.type,
                    dataType: this._read.dataType
                };
                return this.__ajaxRead(props);
            }

            if (this._data) {
                this.__triggerChange();
                return this._data.get();
            }
            return this.__ajaxRead();
        }
    }

    create = (item:Map, callback) => {
        if (this.__ajax) {
            this.__ajaxCreate(item, (response) => {
                // Replace with the new object
                if (callback) {
                    callback(true);
                }
                if (this._data.add(response)) {
                    this._totalCount++;
                    this.__triggerChange();
                }
                // NotificationManager.info("Kayıt eklendi.");
                console.log("Kayıt eklendi.");
            }, (jqXHR, textStatus, errorThrown) => {
                this.__onError(jqXHR, textStatus, errorThrown, callback);
            }
            );
        } else {
            if (this._data.add(item)) {
                this.__triggerChange();
            }
        }
    }

    update = (oldItem:Map, newItem:Map, callback) => {
        if (this.__checkIfHasAnyChanges(oldItem, newItem)) {
            if (callback) {
                callback(true);
            }
            return false;
        }

        if (this.__ajax) {
            this.__ajaxUpdate(newItem, (response) => {
                console.log("updated...");
                if (callback) {
                    callback(true);
                }
                if (this._data.replace(oldItem, response)) {
                    this.__triggerChange();
                }
            }, (jqXHR, textStatus, errorThrown) => {
                this.__onError(jqXHR, textStatus, errorThrown, callback);
            });
        } else {
            if (this._data.replace(oldItem, newItem)) {
                this.__triggerChange();
            }
        }
        return true;
    }

    delete = (item:Map, successCallback, errorCallback) => {
        if (this.__ajax) {
            this.__ajaxDelete(item, (response) => {
                // NotificationManager.info("Kayıt Silindi.");
                if (this._data.remove(item)) {
                    this.__triggerChange();
                }
                if (successCallback) {
                    successCallback(response);
                }
            }, () => {
                // NotificationManager.error("Kayıt Silinemedi !");
                if (errorCallback) {
                    errorCallback();
                }
            });
        } else {
            if (this._data.remove(item)) {
                this.__triggerChange();
            }
        }
    }

    getTotalCount = () => {
        return this._totalCount;
    }

    __checkIfHasAnyChanges = (oldItem, newItem) => {
        return JSON.stringify(oldItem) === JSON.stringify(newItem);
    }

    __changeErrorToUsageFormat = (errors) => {
        for (let i = 0; i < errors.length; i++) {
            let obj = errors[i];
            obj = obj.substr(obj.indexOf(" ") + 1);
            errors[i] = obj;
        }

        return errors;
    }

    __readSuccess = (response, textStatus, request) => {
        this._totalCount = parseInt(request.getResponseHeader("X-Total-Count"), 10) || 0;
        this._data = new DataWrapper(this._importer(response));
        this.__triggerChange();
    }

    __ajaxCreate = (item, success, failure) => {
        item = Objects.deepCopy(item);
        delete item[this.__idField];

        let props = {
            success: success,
            error: failure,
            data: JSON.stringify(item)
        };
        Maps.merge(this._create, props);
        jajax.ajax(props);
    }

    __ajaxRead = (properties) => {
        let props = {
            success: this.__readSuccess
        };

        if (properties) {
            Maps.mergeMissing(this._read, properties);
            props = properties;
        } else {
            Maps.merge(this._read, props);
        }

        jajax.ajax(props);
    }

    __ajaxUpdate = (item, success, failure) => {
        let props = {
            success: success,
            error: failure,
            data: JSON.stringify(item)
        };
        Maps.merge(this._update, props);
        props.url = `${props.url}/${item[this.__idField]}`;
        jajax.ajax(props);
    }

    __ajaxDelete = (item, success, failure) => {
        let props = {
            success: success,
            error: failure,
            data: JSON.stringify(item)
        };
        Maps.merge(this._delete, props);
        props.url = `${props.url}/${item[this.__idField]}`;
        jajax.ajax(props);
    }

    __triggerChange = () => {
        for (let i = 0; i < this._registeredComponents.length; i++) {
            let el = this._registeredComponents[i];
            this.triggerChange(el.component, el.key);
        }
    }

    __onError = (jqXHR, textStatus, errorThrown, callback) => {
        if (jqXHR.status === 409) {
            let error = jqXHR.responseJSON;
            if (callback) {
                let fieldName = error.value.match(/'([^']+)'/)[0];
                // var fieldName = error.value.split(/'/)[1] or use split function
                let msg = "";
                if (error.value.startsWith("Dublicate")) {
                    msg = `${fieldName} ile girdiğiniz değer daha önce kayıt edilmiş.`;
                } else {
                    if (error.value.endsWith("cannot be null")) {
                        msg = `${fieldName} ile girdiğiniz değer boş geçilemez.`;
                    } else {
                        msg = error.value;
                    }
                }
                callback(msg);
            } else {
                console.warn("please use callback for handle this error!", error);
            }
        } else if (jqXHR.status === 422) {
            let errors = this.__changeErrorToUsageFormat(jqXHR.responseJSON.errors);
            if (callback) {
                callback(errors);
            } else {
                console.warn(errors);
            }
        } else if (jqXHR.status === 401) {
            window.location.reload();
        } else if (jqXHR.status === 400) {
            if (callback) {
                callback(jqXHR.responseJSON.details);
            }
        } else if (jqXHR.status === 403) {
            if (callback) {
                callback("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
            } else {
                console.warn(errorThrown);
            }
        } else {
            if (callback) {
                callback(errorThrown);
            } else {
                console.warn(errorThrown);
            }
        }
    }
}
