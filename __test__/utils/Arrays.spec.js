import Arrays from "utils/Arrays";
import chai from "chai";

/** @test {MyClass} */

describe("Arrays.js", () => {
    /** @test {MyClass#sayMyName} */
    it("remove", () => {
        let array = ["a", "b", "c"];
        let removeExpected = ["b", "c"];
        chai.assert.equal(Arrays.remove(array, "a"), true);
        chai.assert.deepEqual(array, removeExpected);
    });

    it("indexOf", () => {
        let array = ["a", "b", "c"];
        chai.assert.equal(Arrays.indexOf(array, "a"), 0);
        chai.assert.equal(Arrays.indexOf(array, "b"), 1);
        chai.assert.equal(Arrays.indexOf(array, "d"), -1);
    });

    it("indexOfByKey", () => {
        let array = [
            { key: "a", value: "a1" },
            { key: "b", value: "b1" },
            { key: "c", value: "c1" }
        ];
        chai.assert.equal(Arrays.indexOfByKey(array, "key", "a"), 0);
        chai.assert.equal(Arrays.indexOfByKey(array, "key", "b"), 1);
        chai.assert.equal(Arrays.indexOfByKey(array, "key", "d"), -1);
    });

    it("extractArray", () => {
        let array = [
            { key: "a", value: "a1" },
            { key: "b", value: "b1" },
            { key: "c", value: "c1" }];
        let expectedKeyArray = ["a", "b", "c"];
        let valueArray = Arrays.extractValueArray(array, "key");
        chai.assert.deepEqual(valueArray, expectedKeyArray);
    });
});
