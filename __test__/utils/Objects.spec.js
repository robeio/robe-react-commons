import chai from "chai";
import Objects from "utils/Objects";

describe("Objects.js", () => {
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
    it("calculateObjectSize", () => {
        let object = {bool: true, number: 2, string: "the string", 
                    nestedObject: {bool: false, number: 3, string: "another string"}};
        chai.assert.equal(Objects.calculateObjectSize(object), 88);
    });
});
