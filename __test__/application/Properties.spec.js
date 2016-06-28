import Properties from "application/Properties";
import chai from "chai";

const should = chai.should();
const assert = chai.assert;

describe("Properties.js", () => {
    let prop = new Properties();

    it("get", () => {
        let expected = {
            FrameworkName: "value1",
            UserCount: 0
        };

        prop.set("FrameworkName", expected.FrameworkName);
        prop.set("UserCount", expected.UserCount);

        assert.equal(prop.get("FrameworkName"), expected.FrameworkName);
        assert.equal(prop.get("UserCount"), expected.UserCount);
        let element = prop.get("Unknown");
        should.equal(element, undefined);
    });
    it("remove", () => {
        prop.set("FrameworkName", "value1");

        assert.equal(prop.get("FrameworkName"), "value1");
        assert.equal(prop.remove("FrameworkName"), true);
        assert.equal(prop.remove("FrameworkName"), false);
    });
});
