import Assertions from "utils/Assertions";
import chai from "chai";

describe("utils/Assertions", () => {
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
