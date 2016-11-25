import Properties from "application/Properties"; // eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

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

    it("set", () => {
        prop.set("MAX_PROPERTY_SIZE", 48);
        assert.throws(() => {
            prop.set("BigValue", "this is really big value");
        }, "Object size cannot be greater than 48 bytes. The key is BigValue", undefined, `Value is bigger than ${prop.get("MAX_PROPERTY_SIZE")} bytes. It should have been throw an error.`);
        assert.doesNotThrow(() => {
            prop.set("NotBigValue", "not big value");
        }, `Value is not bigger than ${prop.get("MAX_PROPERTY_SIZE")} bytes. It should not have been throw an error.`);
    });

    it("remove", () => {
        prop = new Properties();
        prop.set("FrameworkName", "value1");

        assert.equal(prop.get("FrameworkName"), "value1");
        assert.equal(prop.remove("FrameworkName"), true);
        assert.equal(prop.remove("FrameworkName"), false);
    });
});
