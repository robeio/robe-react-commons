import Property from "utils/Properties";
import chai from "chai";

const should = chai.should();
const assert = chai.assert;

describe("Property.js", () => {
    let prop = new Property();

    it("get(key: string) : any", () => {
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
});