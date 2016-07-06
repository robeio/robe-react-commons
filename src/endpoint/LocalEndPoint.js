import ErrorUtility from "../utils/ErrorUtility";
import { Criteria, Restrictions } from "js-criteria/lib";

export default class LocalEndPoint {
    __data;

    constructor(props: Object) {
        this.__data = props.data;
    }

    _query = (query: Object): Array<Function> => {
        let restrictions = [];
        for (let i = 0; i < query.length; i++) {
            let filter = query[i];
            if (filter) {
                let restriction;
                switch (filter.operator) {
                    case "and" :
                        restriction = Restrictions.and.apply(null, this._query(filter.functions));
                        break;
                    case "or" :
                        restriction = Restrictions.and.apply(null, this._query(filter.functions));
                        break;
                    case "=" :
                    case "!=" :
                    case "<" :
                    case "<=" :
                    case ">" :
                    case ">=" :
                        restriction = Restrictions.op(filter.operator, filter.key, filter.value);
                        break;
                    case "~=" :
                        restriction = Restrictions.ilike(filter.key, `%${filter.value}%`);
                        break;
                    case "|=" :
                        restriction = Restrictions.in(filter.key, filter.values);
                        break;
                    default :
                        if (filter.function) {
                            restriction = filter.function;
                        }
                }
                restrictions.push(restriction);
            }
        }
        return restrictions;
    }
    read(offset: string, limit: string, query: string, filter: string, fields: string, successCallBack: Function, errorCallback: Function): boolean {
        let criteria = new Criteria(this.__data);

        if (offset) {
            criteria.setFirstResult(offset);
        }
        if (limit) {
            criteria.setMaxResults(limit);
        }
        /*
        if (query) {

            for (let i = 0; i < query.length; i++) {
                let filter = query[i];

            }
        }
        */


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

    update(newItem: Map, idField: string, successCallback: Function, errorCallback: Function) {
        let onSuccess = (data: Object) => {
            let result = {
                data: data,
                totalCount: 1
            };
            successCallback(result);
        };

        this._updateRequest.call(newItem, undefined, onSuccess, this.__createOnError(errorCallback), [newItem[idField]]);
    }

    delete(item: Map, idField: string, successCallback: Function, errorCallback: Function) {
        let onSuccess = (data: Object) => {
            let result = {
                data: data,
                totalCount: 1
            };
            successCallback(result);
        };
        this._deleteRequest.call(item, undefined, onSuccess, this.__createOnError(errorCallback), [item[idField]]);
    }

    getUrl(): string {
        return this.__url;
    }

    __createOnError(errorCallback: Function): Function {
        return (xhr: Object, exception: string) => {
            let error = ErrorUtility.parseHttpError(xhr, exception);
            errorCallback(error);
        };
    }
}
