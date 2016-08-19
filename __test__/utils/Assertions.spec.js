import React from "react";
import Assertions from "utils/Assertions";
import ShallowComponent from "components/ShallowComponent";
import chai from "chai";

describe("utils/Assertions.js", () => {
    it("isUrl", () => {
        let url = "https://github.com/robeio/robe";
        chai.assert.isTrue(Assertions.isUrl(url), `${url} must be valid`);

        url = "github/robeio/robe";
        chai.assert.isFalse(Assertions.isUrl(url), `${url} must be invalid`);

        chai.assert.throws(() => {
            Assertions.isUrl(url, true);
        }, "Given url is not valid ! URL :github/robeio/robe", undefined,
            "Wrong url must throw exception");

        url = "http://localhost:8080";
        chai.assert.isTrue(Assertions.isUrl(url), `${url} must be valid`);

        url = "178.233.217.157";
        chai.assert.isTrue(Assertions.isUrl(url), `${url} must be valid`);
    });

    it("isNotEmpty", () => {
        let value = {
            a: "1"
        };
        chai.assert.isTrue(Assertions.isNotEmpty(value), `${JSON.stringify(value)} must be valid`);

        value = {};
        chai.assert.isFalse(Assertions.isNotEmpty(value), `${JSON.stringify(value)} must be invalid`);

        chai.assert.throws(() => {
            Assertions.isNotEmpty(value, true);
        }, "Given argument is empty or null !", undefined,
            "If it is empty must throw exception");
    });

    it("isNotUndefined", () => {
        let value = {
            a: "1"
        };
        chai.assert.isTrue(Assertions.isNotUndefined(value), `${JSON.stringify(value)} must be valid`);

        value = undefined;
        chai.assert.isFalse(Assertions.isNotUndefined(value), `${JSON.stringify(value)} must be invalid`);

        chai.assert.throws(() => {
            Assertions.isNotUndefined(value, true);
        }, "Given argument is undefined !", undefined,
            "If it is undefined must throw exception");
    });

    it("isNotUndefinedAndNull", () => {
        let value = {
            a: "1"
        };
        chai.assert.isTrue(Assertions.isNotUndefinedAndNull(value), `${JSON.stringify(value)} must be valid`);

        value = undefined;
        chai.assert.isFalse(Assertions.isNotUndefinedAndNull(value), `${JSON.stringify(value)} must be invalid`);

        chai.assert.throws(() => {
            Assertions.isNotUndefinedAndNull(value, true);
        }, "Given argument is undefined !", undefined,
            "If it is undefined must throw exception");

        value = null;
        chai.assert.isFalse(Assertions.isNotUndefinedAndNull(value), `${JSON.stringify(value)} must be invalid`);

        chai.assert.throws(() => {
            Assertions.isNotUndefinedAndNull(value, true);
        }, "Given argument is null !", undefined,
            "If it is null must throw exception");
    });

    it("isFunction", () => {
        let value = function getOne(): number {
            return 1;
        };// eslint-disable-line
        chai.assert.isTrue(Assertions.isFunction(value), "getOne must be valid");

        value = undefined;
        chai.assert.isFalse(Assertions.isFunction(value), "getOne must be invalid");

        value = {};
        chai.assert.isFalse(Assertions.isFunction(value), "getOne must be invalid");

        chai.assert.throws(() => {
            Assertions.isFunction(value, true);
        }, "Given argument is not a function !", undefined,
            "If it is not function must throw exception");
    });

    it("isNotAnonymous", () => {
        let value = function getOne(): number {
            return 1;
        };// eslint-disable-line
        chai.assert.isTrue(Assertions.isNotAnonymous(value), "getOne must be valid");

        value = undefined;
        chai.assert.isFalse(Assertions.isNotAnonymous(value), "getOne must be invalid");

        chai.assert.equal(Assertions.isNotAnonymous((): number => {
            return 1;
        }), false, "getOne must be invalid");// eslint-disable-line

        chai.assert.throws(() => {
            Assertions.isNotAnonymous((): number => {
                return 1;
            }, true);// eslint-disable-line
        }, "Given argument is a anonymous function !", undefined,
            "If it is not anonymous function must throw exception");
    });

    it("isObject", () => {
        let value = {
            a: "1"
        };
        chai.assert.isTrue(Assertions.isObject(value), `${JSON.stringify(value)} must be valid`);

        value = {
            stringElement: "Element1",
            numberElement: 5,
            booleanElement: true,
            functionElement: () => {
            }
        };
        chai.assert.isTrue(Assertions.isObject(value), `${JSON.stringify(value)} must be valid`);

        value = undefined;
        chai.assert.isFalse(Assertions.isObject(value), `${JSON.stringify(value)} must be invalid`);

        value = "blabla";
        chai.assert.isFalse(Assertions.isObject(value), `${JSON.stringify(value)} must be invalid`);

        value = 3;
        chai.assert.isFalse(Assertions.isObject(value), `${JSON.stringify(value)} must be invalid`);

        chai.assert.throws(() => {
            Assertions.isObject(value, true);
        }, "Given format is not valid object !", undefined,
            "If it is not object must throw exception");
    });

    it("isJson", () => {
        /* eslint-disable quote-props */
        let value = {
            a: "1"
        };
        chai.assert.isTrue(Assertions.isJson(value), `${JSON.stringify(value)} must be valid`);

        value = undefined;
        chai.assert.isFalse(Assertions.isJson(value), `${JSON.stringify(value)} must be invalid`);

        value = "blabla";
        chai.assert.isFalse(Assertions.isJson(value), `${JSON.stringify(value)} must be invalid`);

        value = 3;
        chai.assert.isFalse(Assertions.isJson(value), `${JSON.stringify(value)} must be invalid`);

        chai.assert.throws(() => {
            Assertions.isJson(value, true);
        }, "Given format is not valid json format !", undefined,
            "If it is not json must throw exception");
    });

    it("isInteger", () => {
        let value = 3;
        chai.assert.isTrue(Assertions.isInteger(value), `${value} must be valid`);

        value = "5";
        chai.assert.isTrue(Assertions.isInteger(value), `${value} must be valid`);

        value = "blabla";
        chai.assert.isFalse(Assertions.isInteger(value), `${value} must be invalid`);

        value = {};
        chai.assert.isFalse(Assertions.isInteger(value), `${value} must be invalid`);

        chai.assert.throws(() => {
            Assertions.isInteger(value, true);
        }, "Given argument is not a integer !", undefined,
            "If it is not integer must throw exception");
    });
    it("isString", () => {
        let value = "Hello";
        chai.assert.isTrue(Assertions.isString(value), `${value} must be valid`);

        value = "5";
        chai.assert.isTrue(Assertions.isString(value), true, `${value} must be valid`);

        value = 5;
        chai.assert.isFalse(Assertions.isString(value), false, `${value} must be invalid`);

        value = {};
        chai.assert.isFalse(Assertions.isString(value), false, `${value} must be invalid`);

        value = [];
        chai.assert.throws(() => {
            Assertions.isString(value, true);
        }, "Given format is not valid string !", undefined,
            "If it is not string must throw exception");
    });

    it("isArray", () => {
        let value = "Hello";
        chai.assert.isFalse(Assertions.isArray(value), `${value} must be invalid`);

        value = "5";
        chai.assert.isFalse(Assertions.isArray(value), `${value} must be invalid`);

        value = 5;
        chai.assert.isFalse(Assertions.isArray(value), `${value} must be invalid`);

        value = [];
        chai.assert.isTrue(Assertions.isArray(value), `${JSON.stringify(value)} must be valid`);

        value = {};
        chai.assert.throws(() => {
            Assertions.isArray(value, true);
        }, "Given format is not valid array !", undefined,
            "If it is not array must throw exception");
    });

    it("isMap", () => {
        let value = "Hello";
        chai.assert.isFalse(Assertions.isMap(value), `${value} must be invalid`);

        value = "5";
        chai.assert.isFalse(Assertions.isMap(value), `${value} must be invalid`);

        value = 5;
        chai.assert.isFalse(Assertions.isMap(value), `${value} must be invalid`);

        value = [];
        chai.assert.isFalse(Assertions.isMap(value), `${JSON.stringify(value)} must be invalid`);

        value = {
            func: (): number => { return 1; }
        };
        chai.assert.isFalse(Assertions.isMap(value), `${JSON.stringify(value)} must be invalid`);

        value = {
            notMap: {
                func: (): number => { return 1; }
            }
        };
        chai.assert.isFalse(Assertions.isMap(value), `${JSON.stringify(value)} must be invalid`);

        value = {
            map: {
                a: 1
            }
        };
        chai.assert.isTrue(Assertions.isMap(value), `${JSON.stringify(value)} must be valid`);

        // javascript hash object ok
        value = {
            stringElement: "Element1",
            numberElement: 5,
            booleanElement: true
        };
        chai.assert.isTrue(Assertions.isMap(value), `${JSON.stringify(value)} must be invalid`);
        // json hash object ok
        value = {
            "stringElement": "Element1",
            "numberElement": 5,
            "booleanElement": true
        };
        chai.assert.isTrue(Assertions.isMap(value), `${JSON.stringify(value)} must be invalid`);
        // javascript object has function is not ok
        value = {
            stringElement: "Element1",
            numberElement: 5,
            booleanElement: true
        };

        chai.assert.isTrue(Assertions.isMap(value), `${JSON.stringify(value)} must be invalid`);

        chai.assert.throws(() => {
            Assertions.isMap(value, true);
        }, "Given format is not valid hash map !", undefined,
            "If it is not map must throw exception");

        value = {
            a: 1
        };
        value.__proto__.aa = 2;
        chai.assert.isFalse(Assertions.isMap(value), `${JSON.stringify(value)} must be invalid`);
    });

    it("isReactComponent", () => {
        let component = (<div></div>);
        chai.assert.isTrue(Assertions.isReactComponent(component), "Component is not a react component ! ");

        component = {};
        chai.assert.isFalse(Assertions.isReactComponent(component), "Component is a react component ! ");

        chai.assert.throws(() => {
            Assertions.isReactComponent({}, true)
        }, "Given component is not a react component ! Component :[object Object]", undefined, "Must throw an exception");
    });

    it("isReactComponentClass", () => {
        let component = ShallowComponent;
        chai.assert.isTrue(Assertions.isReactComponentClass(component), "Component Class is not a react component ! ");

        component = Assertions;
        chai.assert.isFalse(Assertions.isReactComponentClass(component), "Component Class is a react component ! ");

        chai.assert.throws(() => {
            Assertions.isReactComponentClass(component, true)
        }, "Given component class is not a React.Component ! Class :[object Object]", undefined, "Must throw an exception");
    });
});
