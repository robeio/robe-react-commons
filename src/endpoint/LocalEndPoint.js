export default class LocalEndPoint {

    read(_offset, _limit, _query, code, value, fields, successCallBack, errorCallback) {
        this.__notImplementedError("read");
    }

    create(item: Map, successCallback, errorCallback) {
        this.__notImplementedError("create");
    }

    update(oldItem:Map, newItem:Map, successCallback, errorCallback) {
        this.__notImplementedError("update");
    }

    delete(item:Map, successCallback, errorCallback) {
        this.__notImplementedError("delete");
    }
}
