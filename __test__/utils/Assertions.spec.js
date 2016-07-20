import Assertions from "utils/Assertions";
import chai from "chai";

describe("Assertions.js", () => {
    it("isUrl", () => {
        let url = "https://github.com/robeio/robe";
        chai.assert.equal(Assertions.isUrl(url), true);

        url = "github/robeio/robe";
        chai.assert.equal(Assertions.isUrl(url), false);

        let result = false;
        try {
            chai.assert.equal(Assertions.isUrl(url, true), false);
            result = false;
        } catch (e) {
            result = true;
        }

        chai.assert.isOk(result, "Exception expected.");

        url = "http://localhost:8080";
        chai.assert.equal(Assertions.isUrl(url), true);

        url = "178.233.217.157";
        chai.assert.equal(Assertions.isUrl(url), true);
    });

    it("isNotEmpty", () => {
        let value = {a: "1"};
        chai.assert.equal(Assertions.isNotEmpty(value), true);

        value = {};
        chai.assert.equal(Assertions.isNotEmpty(value), false);

        let result = false;
        try {
            chai.assert.equal(Assertions.isNotEmpty(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isNotUndefined", () => {
        let value = {a: "1"};
        chai.assert.equal(Assertions.isNotUndefined(value), true);

        value = undefined;
        chai.assert.equal(Assertions.isNotUndefined(value), false);

        let result = false;
        try {
            chai.assert.equal(Assertions.isNotUndefined(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isNotUndefinedAndNull", () => {
        let value = {a: "1"};
        chai.assert.equal(Assertions.isNotUndefinedAndNull(value), true);

        value = undefined;
        chai.assert.equal(Assertions.isNotUndefinedAndNull(value), false);

        let result = false;
        try {
            chai.assert.equal(Assertions.isNotUndefined(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");

        value = null;
        chai.assert.equal(Assertions.isNotUndefinedAndNull(value), false);
        result = false;
        try {
            chai.assert.equal(Assertions.isNotUndefined(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isFunction", () => {
        let value = function getOne():number {
            return 1;
        };// eslint-disable-line
        chai.assert.equal(Assertions.isFunction(value), true);

        value = undefined;
        chai.assert.equal(Assertions.isFunction(value), false);
        value = {};
        chai.assert.equal(Assertions.isFunction(value), false);
        let result = false;
        try {
            chai.assert.equal(Assertions.isFunction(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isNotAnonymous", () => {
        let value = function getOne():number {
            return 1;
        };// eslint-disable-line
        chai.assert.equal(Assertions.isNotAnonymous(value), true);

        value = undefined;
        chai.assert.equal(Assertions.isNotAnonymous(value), false);

        chai.assert.equal(Assertions.isNotAnonymous(function () {
            return 1;
        }), false);// eslint-disable-line
        let result = false;
        try {
            chai.assert.equal(Assertions.isNotAnonymous(function () {
                return 1;
            }, true), false);// eslint-disable-line
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isObject", () => {
        let value = {a: "1"};
        chai.assert.isTrue(Assertions.isObject(value));

        value = {
            stringElement: "Element1",
            numberElement: 5,
            booleanElement: true,
            functionElement: () => {
                console.log("Example")
            }
        };
        chai.assert.isTrue(Assertions.isObject(value));

        value = undefined;
        chai.assert.isFalse(Assertions.isObject(value));

        value = "blabla";
        chai.assert.isFalse(Assertions.isObject(value));

        value = 3;
        chai.assert.isFalse(Assertions.isObject(value));

        let result = false;
        try {
            Assertions.isObject(value, true);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isJson", () => {
        /* eslint-disable quote-props */
        let value = {"a": "1"};
        chai.assert.equal(Assertions.isJson(value), true);

        value = undefined;
        chai.assert.equal(Assertions.isJson(value), false);

        value = "blabla";
        chai.assert.equal(Assertions.isJson(value), false);

        value = 3;
        chai.assert.equal(Assertions.isJson(value), false);

        value = 3;
        chai.assert.equal(Assertions.isJson(value), false);

        let result = false;
        try {
            chai.assert.equal(Assertions.isJson(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isInteger", () => {
        let value = 3;
        chai.assert.equal(Assertions.isInteger(value), true);

        value = "5";
        chai.assert.equal(Assertions.isInteger(value), true);

        value = "blabla";
        chai.assert.equal(Assertions.isInteger(value), false);

        value = {};
        chai.assert.equal(Assertions.isInteger(value), false);

        value = [];
        let result = false;
        try {
            chai.assert.equal(Assertions.isInteger(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });
    it("isString", () => {
        let value = "Hello";
        chai.assert.equal(Assertions.isString(value), true);

        value = "5";
        chai.assert.equal(Assertions.isString(value), true);

        value = 5;
        chai.assert.equal(Assertions.isString(value), false);

        value = {};
        chai.assert.equal(Assertions.isString(value), false);

        value = [];
        let result = false;
        try {
            chai.assert.equal(Assertions.isString(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isArray", () => {
        let value = "Hello";
        chai.assert.equal(Assertions.isArray(value), false);

        value = "5";
        chai.assert.equal(Assertions.isArray(value), false);

        value = 5;
        chai.assert.equal(Assertions.isArray(value), false);

        value = [];
        chai.assert.equal(Assertions.isArray(value), true);

        value = {};
        let result = false;
        try {
            chai.assert.equal(Assertions.isArray(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isMap", () => {
        let value = "Hello";
        chai.assert.isFalse(Assertions.isMap(value), "");

        value = "5";
        chai.assert.isFalse(Assertions.isMap(value), false);

        value = 5;
        chai.assert.isFalse(Assertions.isMap(value), false);

        value = [];
        chai.assert.isFalse(Assertions.isMap(value), false);

        // javascript hash object ok
        value = {
            stringElement: "Element1",
            numberElement: 5,
            booleanElement: true
        };
        chai.assert.isTrue(Assertions.isMap(value));
        // json hash object ok
        value = {
            "stringElement": "Element1",
            "numberElement": 5,
            "booleanElement": true
        };
        chai.assert.isTrue(Assertions.isMap(value));
        // javascript object has function is not ok
        value = {
            stringElement: "Element1",
            numberElement: 5,
            booleanElement: true
        };

        chai.assert.isTrue(Assertions.isMap(value));

        let result = false;
        try {
            Assertions.isMap(value, true);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });
});
