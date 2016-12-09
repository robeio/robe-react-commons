import Cookies from "utils/Cookies";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

describe("Cookies.js", () => {
    it("get&put", () => {
        chai.assert.equal(Cookies.get("get", 1), 1);
        Cookies.put("get", 2);
        chai.assert.equal(Cookies.get("get", 1), 2);
    });

    it("remove", () => {
        chai.assert.equal(Cookies.get("remove", 1), 1);
        Cookies.put("remove", 2);
        chai.assert.equal(Cookies.get("remove", 1), 2);
        Cookies.remove("remove");
        chai.assert.equal(Cookies.get("remove", 1), 1);
    });

    it("clearAll", () => {
        chai.assert.equal(Cookies.get("clearAll", 1), 1);
        Cookies.put("clearAll", 2);
        chai.assert.equal(Cookies.get("clearAll", 1), 2);
        Cookies.clearAll();
        chai.assert.equal(Cookies.get("clearAll", 1), 1);
    });
});
