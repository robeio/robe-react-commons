const toString = Object.prototype.toString;
const TYPE_PREFIX = "[object ";
const NATIVE_TYPES = {
    "[object Number]": Number,
    "[object Boolean]": Boolean,
    "[object Array]": Array,
    "[object String]": String,
    "[object Date]": Date,
    "[object RegExp]": RegExp,
    "[object Null]": "Null",
    "[object Function]": Function,
    "[object Undefined]": "Undefined",
    "[object FormData]": FormData,
    "[object File]": File
};

const returnSameFunction = (o) => {
    return o;
};

const CLONE_FUNCTIONS = {
    Null: returnSameFunction,
    Undefined: returnSameFunction,
    String: (o) => {
        return String(o);
    },
    Boolean: returnSameFunction,
    Date: (o) => {
        return new Date(o.getTime());
    },
    Number: (o) => {
        return Number(o);
    },
    Function: returnSameFunction,
    RegExp: (o) => {
        return new RegExp(o);
    },
    File: returnSameFunction,
    FormData: returnSameFunction
};

export default class Types {
    static getTypeName(obj: any): string {
        let typeString = toString.call(obj);
        let type = NATIVE_TYPES[typeString];
        if (type) {
            return typeof type === "string" ? type : type.name;
        }
        return typeString.substring(TYPE_PREFIX.length, typeString.length - 1);
    }
    static getCloneFunction(typeName: any): any {
        let cloner = CLONE_FUNCTIONS[typeName];
        if (!cloner) cloner = CLONE_FUNCTIONS[typeName];
        return cloner;
    }

    static getType(obj: any) {
        let typeString = toString.call(obj);
        return NATIVE_TYPES[typeString];
    }
}

