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
    read(filters, successCallBack: Function, errorCallback: Function): boolean {
        let criteria = new Criteria(this.__data);

        if (filters.offset) {
            criteria.setFirstResult(filters.offset);
        }
        if (filters.limit) {
            criteria.setMaxResults(filters.limit);
        }
        /*
        if (query) {

            for (let i = 0; i < query.length; i++) {
                let filter = query[i];

            }
        }
        */
    }

    create(item: Map, successCallback: Function, errorCallback: Function): boolean {

    }

    update(newItem: Map, idField: string, successCallback: Function, errorCallback: Function) {

    }

    delete(item: Map, idField: string, successCallback: Function, errorCallback: Function) {

    }
}
