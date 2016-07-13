import Assertions from "../utils/Assertions";

/**
 * A singleton class which helps generating API query parameters supported by Robe.
 */
class QueryParams {

    stringify(params: Object) {
        // TODO: Additional validations will be added later.
        Assertions.isNotUndefined(params, true);

        let url = ["url"];
        let isFirstParam = true;

        this.__integerValidation(params.offset, 0, () => {
            url.push(`${this.__getQParamPrefix(isFirstParam)}_offset=${params.offset}`);
            isFirstParam = false;
        });
        this.__integerValidation(params.limit, 1, () => {
            url.push(`${this.__getQParamPrefix(isFirstParam)}_limit=${params.limit}`);
            isFirstParam = false;
        });
        this.__stringValidation(params.q, () => {
            url.push(`${this.__getQParamPrefix(isFirstParam)}_q=${params.q}`);
            isFirstParam = false;
        });
        this.__stringArrayValidation(params.fields, "fields", () => {
            url.push(`${this.__getQParamPrefix(isFirstParam)}_fields=${params.fields.join()}`);
            isFirstParam = false;
        });


        if (Assertions.isNotUndefinedAndNull(params.sort)) {
            if (!Assertions.isArray(params.sort)) {
                throw new Error(`Given sort value (${params.sort}) must a valid array.`);
            }
            url.push(`${this.__getQParamPrefix(isFirstParam)}_sort=`);
            isFirstParam = false;
            let sorts = [];
            for (let i = 0; i < params.sort.length; i++) {
                let item = params.sort[i];
                if (!Assertions.isString(item)) {
                    this.__stringArrayValidation(item, `sort[${i}]`);
                    switch (item[1]) {
                        case "ASC":
                            sorts.push(`+${item[0]}`);
                            break;
                        case "DESC":
                            sorts.push(`-${item[0]}`);
                            break;
                        default:
                            throw new Error(`Given sort item (${item}) must a ASC or DESC.`);
                    }
                }
            }
            url.push(sorts.join());
        }

        if (Assertions.isNotUndefinedAndNull(params.filters)) {
            if (!Assertions.isArray(params.filters)) {
                throw new Error(`Given filters value (${params.filters}) must a valid array.`);
            }
            url.push(`${this.__getQParamPrefix(isFirstParam)}_filter=`);
            isFirstParam = false;
            let filters = [];
            for (let i = 0; i < params.filters.length; i++) {
                let item = params.filters[i];
                if (!Assertions.isString(item)) {
                    this.__opValidation(item, `filters[${i}]`);
                    if (item[1] === "|=") {
                        item[2] = item[2].join("|");
                    }
                    filters.push(item.join(""));
                }
            }
            url.push(filters.join());
        }
        return url.join("");
    }


    __integerValidation(value: number, min: number, cb: Function) {
        if (Assertions.isNotUndefinedAndNull(value)) {
            if (!Assertions.isInteger(value)) {
                throw new Error(`Given offset value (${value}) is not a number !`);
            }
            if (value < min) {
                throw new Error(`Given offset value (${value}) must be > ${min}.`);
            }
            if (cb !== undefined) {
                cb();
            }
        }
    }
    __stringValidation(value: string, cb: Function) {
        if (Assertions.isNotUndefinedAndNull(value)) {
            if (!Assertions.isString(value)) {
                throw new Error(`Given offset value (${value}) is not a string !`);
            }
            if (cb !== undefined) {
                cb();
            }
        }
    }

    __stringArrayValidation(value: Array, tag: string, cb: Function) {
        if (Assertions.isNotUndefinedAndNull(value)) {
            if (!Assertions.isArray(value)) {
                throw new Error(`Given ${tag} value (${value}) must a valid array.`);
            }
            for (let i = 0; i < value.length; i++) {
                if (!Assertions.isString(value[i])) {
                    throw new Error(`Given ${tag} value at ${i} (${value[i]}) must a valid string.`);
                }
            }
            if (cb !== undefined) {
                cb();
            }
        }
    }
    __opValidation(value: Array, tag: string) {
        if (Assertions.isNotUndefinedAndNull(value)) {
            if (!Assertions.isArray(value)) {
                throw new Error(`Given ${tag} value (${value}) must a valid array.`);
            }
            for (let i = 0; i < value.length; i++) {
                // if (!Assertions.isString(value[i])) {
                //     throw new Error(`Given ${tag} value at ${i} (${value[i]}) must a valid string.`);
                // }
            }
        }
    }
    __getQParamPrefix(isFirstParam: boolean): string {
        return isFirstParam ? "?" : "&";
    }

}

export default new QueryParams();
