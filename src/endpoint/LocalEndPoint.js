import { Criteria, Order, Restrictions } from "js-criteria";
import Assertions from "../utils/Assertions";
import MapArray from "../collections/MapArray";
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["__filter","__stringValidation","__sort"] }] */

export default class LocalEndPoint {
    __dataMap= [];
    constructor(props: Object) {
        this.__dataMap = new MapArray(props.data, props.idField);
    }
    read(query: Object, successCallBack: Function, errorCallback: Function): boolean {
        try {
            let criteria = new Criteria(this.__dataMap.getData());

            if (query) {
                // offset
                if (query.offset) {
                    criteria.setFirstResult(query.offset);
                }
                // limit
                if (query.limit) {
                    criteria.setMaxResults(query.limit);
                }

                if (query.q) {
                    criteria.addQuery({
                        value: query.q,
                        ignoreList: ["id", "oid"]
                    });
                }
                // filters

                if (query.filters) {
                    let filters = this.__filter(query.filters);

                    for (let i = 0; i < filters.length; i += 1) {
                        criteria.add(filters[i]);
                    }
                }
                // orderings
                if (query.sort) {
                    let orders = this.__sort(query.sort);

                    for (let i = 0; i < orders.length; i += 1) {
                        criteria.addOrder(orders[i]);
                    }
                }
            }

            let data = criteria.list();

            let result = {
                data: data,
                totalCount: data.length
            };
            if (successCallBack) {
                successCallBack(result);
            }

            return true;
        } catch (e) {
            if (errorCallback) {
                let code = e.code ? e.code : 500;
                let message = e.message ? e.message : e;
                errorCallback(code, message);
            }
            return false;
        }
    }

    create(item: Map, successCallback: Function, errorCallback: Function): boolean {
        if (this.__dataMap.add(item)) {
            let data = this.__dataMap.getData();
            let result = {
                data: item,
                totalCount: data.length
            };
            
            if (successCallback) {
                successCallback(result);
            }
        } else if (errorCallback) {
            errorCallback("cannot added.");
        }
    }
    
    update(newItem: Map, idField: string, successCallback: Function, errorCallback: Function) {
        if (this.__dataMap.replace(newItem)) {
            let data = this.__dataMap.getData();
            let result = {
                data: newItem,
                totalCount: data.length
            };
            
            if (successCallback) {
                successCallback(result);
            }
        } else if (errorCallback) {
            errorCallback("cannot updated.");
        }
    }

    delete(item: Map, idField: string, successCallback: Function, errorCallback: Function) {
        if (this.__dataMap.replace(item)) {
            let data = this.__dataMap.getData();
            let result = {
                data: item,
                totalCount: data.length
            };
            successCallback(result);
        } else if (errorCallback) {
            errorCallback("cannot delete.");
        }
    }


    __filter(filters: Array<Object>): Array<Function> {
        let restrictions: Array<Function> = [];
        Assertions.isArray(filters, false);
        for (let i = 0; i < filters.length; i += 1) {
            let filter = filters[i];
            if (filter) {
                let restriction;
                switch (filter[1]) {
                    case "=":
                        restriction = Restrictions.eq(filter[0], filter[2]);
                        break;
                    case "~=":
                        restriction = Restrictions.startsWith(filter[0], filter[2]);
                        break;
                    case "=~":
                        restriction = Restrictions.endsWith(filter[0], filter[2]);
                        break;
                    case "~":
                        restriction = Restrictions.contains(filter[0], filter[2]);
                        break;
                    case "!=":
                        // TODO not implement yet
                        // restriction = Restrictions.not.eq(filter[0],filter[2]);
                        break;
                    case "<":
                        restriction = Restrictions.lt(filter[0], filter[2]);
                        break;
                    case "<=":
                        restriction = Restrictions.lte(filter[0], filter[2]);
                        break;
                    case ">":
                        restriction = Restrictions.gt(filter[0], filter[2]);
                        break;
                    case ">=":
                        restriction = Restrictions.gte(filter[0], filter[2]);
                        break;
                    case "|=":
                        restriction = Restrictions.in(filter[0], filter[2]);
                        break;
                    default:
                        restriction = null;
                }
                if (restriction) {
                    restrictions.push(restriction);
                }
            }
        }
        return restrictions;
    }

    __sort(sorts: Array<Array>): Array<Function> {
        let orders = [];
        Assertions.isArray(sorts, false);

        for (let i = 0; i < sorts.length; i += 1) {
            let sort: Array = sorts[i];
            if (sort) {
                let order;
                if (typeof sort[1] === "string") {
                    switch (sort[1]) {
                        case "ASC":
                            order = Order.asc(sort[0]);
                            break;
                        case "DESC":
                            order = Order.desc(sort[0]);
                            break;
                        default:
                    }
                } else {
                    // TODO Custom sort will implement.
                    throw new Error("Unknown Sort Parameter ! ");
                }
                if (order) {
                    orders.push(order);
                    order = null;
                }
            }
        }
        return orders;
    }
}
