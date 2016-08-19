import { Criteria, Restrictions, Order } from "js-criteria";
import Assertions from "../utils/Assertions";


export default class LocalEndPoint {
    __data;
    constructor(props: Object) {
        this.__data = props.data;
    }

    __filter(filters: Array<Object>): Array<Function> {
        let restrictions: Array<Function> = [];
        Assertions.isArray(filters, false);
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i];
            if (filter) {
                let restriction;
                switch (filter.operator) {
                    case "=":
                        restriction = Restrictions.eq(filter.key, filter.value);
                        break;
                    case "~=":
                        restriction = Restrictions.startsWith(filter.key, filter.value);
                        break;
                    case "=~":
                        restriction = Restrictions.endsWith(filter.key, filter.value);
                        break;
                    case "~":
                        restriction = Restrictions.contains(filter.key, filter.value);
                        break;
                    case "!=":
                        // TODO not implement yet
                        // restriction = Restrictions.not.eq(filter.key, filter.value);
                        break;
                    case "<":
                        restriction = Restrictions.lt(filter.key, filter.value);
                        break;
                    case "<=":
                        restriction = Restrictions.lte(filter.key, filter.value);
                        break;
                    case ">":
                        restriction = Restrictions.gt(filter.key, filter.value);
                        break;
                    case ">=":
                        restriction = Restrictions.gte(filter.key, filter.value);
                        break;
                    case "|=":
                        restriction = Restrictions.in(filter.key, filter.value);
                        break;
                    default:
                        continue;
                }
                restrictions.push(restriction);
            }
        }
        return restrictions;
    }

    __sort(sorts: Array<Array>): Array<Function> {
        let orders = [];
        Assertions.isArray(sorts, false);

        for (let i = 0; i < sorts.length; i++) {
            let sort: Array = sorts[i];
            if (sort) {
                let order;
                switch (sort[1]) {
                    case "ASC":
                        order = Order.asc(sort[0]);
                        break;
                    case "DESC":
                        order = Order.desc(sort[0]);
                        break;
                    default:
                        continue;
                }
                orders.push(order);
            }
        }
        return orders;
    }

    /**
     * 
     *
     */
    read(query: Object, successCallBack: Function, errorCallback: Function): boolean {
        try {
            let criteria = new Criteria(this.__data);

            if (query) {
                // offset
                if (query.offset) {
                    criteria.setFirstResult(query.offset);
                }
                // limit
                if (query.limit) {
                    criteria.setMaxResults(query.limit);
                }
                // filters

                if (query.filters) {
                    let filters = this.__filter(query.filters);

                    for (let i = 0; i < filters.length; i++) {
                        criteria.add(filters[i]);
                    }
                }
                // orderings
                if (query.sort) {
                    let orders = this.__sort(query.sort);

                    for (let i = 0; i < orders.length; i++) {
                        criteria.addOrder(orders[i]);
                    }
                }
            }
            let result = {
                data: criteria.list(),
                totalCount: this.__data.length
            };
            if (successCallBack) {
                successCallBack(result);
            }

            return true;
        } catch (e) {
            let code: number;
            let message: string;
            code = e.code ? e.code : 500;
            message = e.message ? e.message : e;
            if (errorCallback) {
                errorCallback(code, message);
            }

            return false;
        }
    }
}
