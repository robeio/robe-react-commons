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
    it("getTypeName", () => {

    })
    it("hasProperty", () => {
        let obj = { element: "Example" };
        chai.assert.isOk(Objects.hasProperty(obj, "element"));
    })
    it("mergeClone", () => {
        let x = "X";
        let y = "Y";
        let z = "Z";
        let a = { x, y };
        let b = { y, z };
        let result = Objects.mergeClone(a, b);
        chai.assert.deepEqual(b, result);
        chai.assert.isOk(b.x === "X");
    })

    it("cloneArray", () => {
        let x = { obj: "example" };
        let y = [x];
        let result = Objects.cloneArray(y);
        chai.assert.isOk(y !== result);
    })

    it("cloneObject", () => {
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
    })

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
