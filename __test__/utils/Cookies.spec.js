import Cookies from "utils/Cookies";
import chai from "chai";

describe("Cookies.js", () => {
    it("get&put", () => {
        chai.assert.strictEqual(Cookies.get("get", 1), 1);
        Cookies.put("get", 2);
        chai.assert.strictEqual(Cookies.get("get", 1), 2);
    });

    it("remove", () => {
        chai.assert.strictEqual(Cookies.get("remove", 1), 1);
        Cookies.put("remove", 2);
        chai.assert.strictEqual(Cookies.get("remove", 1), 2);
        Cookies.remove("remove");
        chai.assert.strictEqual(Cookies.get("remove", 1), 1);
    });

    it("clearAll", () => {
        chai.assert.strictEqual(Cookies.get("clearAll", 1), 1);
        Cookies.put("clearAll", 2);
        chai.assert.strictEqual(Cookies.get("clearAll", 1), 2);
        Cookies.clearAll();
        chai.assert.strictEqual(Cookies.get("clearAll", 1), 1);
    });
});
