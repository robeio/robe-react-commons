import Objects from "utils/Objects";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

describe("utils/Objects.js", () => {
    it("equals", () => {
        let map1 = { key: "a", value: "a1" };
        let map2 = { key: "a", value: "a1" };
        let map3 = { key: "a", value: "a2" };
        chai.assert.equal(Objects.equals(map1, map2), true);
        chai.assert.equal(Objects.equals(map1, map3), false);
    });
    it("deepCopy", () => {
        let map1 = { key: "a", value: "a1" };
        let map2 = Objects.deepCopy(map1);
        chai.assert.deepEqual(map1, map2);
    });
    it("sizeOf", () => {
        let object = {
            bool: true,
            number: 2,
            string: "the string",
            nestedObject: {
                bool: false,
                number: 3,
                string: "another string"
            }
        };
        chai.assert.equal(Objects.sizeOf(object), 160);
    });
    it("clone", () => {
        let object = {
            bool: true,
            number: 2,
            string: "the string",
            nestedObject: {
                bool: false,
                number: 3,
                string: "another string"
            }
        };
        chai.assert.deepEqual(Objects.clone(object), object);
    });
});
