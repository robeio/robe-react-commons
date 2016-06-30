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
        let value = { a: "1" };
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
        let value = { a: "1" };
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

    it("isFunction", () => {
        let value = function getOne(): number { return 1; };
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
        let value = function getOne(): number { return 1; };
        chai.assert.equal(Assertions.isNotAnonymous(value), true);

        value = undefined;
        chai.assert.equal(Assertions.isNotAnonymous(value), false);

        chai.assert.equal(Assertions.isNotAnonymous(function () { return 1; }), false);
        let result = false;
        try {
            chai.assert.equal(Assertions.isNotAnonymous(function () { return 1; }, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("isObject", () => {
        let value = { a: "1" };
        chai.assert.equal(Assertions.isObject(value), true);

        value = undefined;
        chai.assert.equal(Assertions.isObject(value), false);

        value = "blabla";
        chai.assert.equal(Assertions.isObject(value), false);

        value = 3;
        chai.assert.equal(Assertions.isObject(value), false);

        value = 3;
        chai.assert.equal(Assertions.isObject(value), false);

        let result = false;
        try {
            chai.assert.equal(Assertions.isObject(value, true), false);
            result = false;
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });
});
