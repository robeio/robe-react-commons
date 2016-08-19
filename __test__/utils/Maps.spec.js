import Maps from "utils/Maps";
import chai from "chai";

describe("utils/Maps.js", () => {
    let func1 = () => {

    };
    let func2 = () => {

    };

    it("forEach", () => {
        let map = { key: "a", value: "a1" };
        let expectedKeyArray = ["key", "value"];
        let keyArray = [];
        Maps.forEach(map, (value: any, key: string) => {
            keyArray.push(key);
        });
        chai.assert.deepEqual(keyArray, expectedKeyArray);
    });

    it("toArray", () => {
        let map = { key: "a", value: "a1" };
        let expectedKeyArray = ["a", "a1"];
        let keyArray = Maps.toArray(map);
        chai.assert.deepEqual(keyArray, expectedKeyArray);
    });

    it("merge", () => {
        let src = {
            a: {
                aa: "aa"
            }
        };
        let dest = {
            a: {
                bb: "bb"
            },
            c: 5
        };
        let expectedMap = {
            a: {
                aa: "aa"
            },
            c: 5
        };
        Maps.merge(src, dest);
        chai.assert.deepEqual(dest, expectedMap);
    });

    it("mergeMissing", () => {
        let src1 = { key: "a" };
        let src2 = { key: "a2" };
        let dest = { value: "a1" };
        let expectedMap = { key: "a", value: "a1" };
        Maps.mergeMissing(src1, dest);
        chai.assert.deepEqual(dest, expectedMap);
        Maps.mergeMissing(src2, dest);
        chai.assert.deepEqual(dest, expectedMap);
    });

    it("mergeDeep", () => {
        let src = {
            a: {
                aa: "aa",
                c: func1
            }
        };
        let dest = {
            a: {
                bb: "bb"
            }
        };
        let expectedMap = {
            a: {
                aa: "aa",
                c: func1,
                bb: "bb"
            }
        };
        dest = Maps.mergeDeep(src, dest);
        chai.assert.deepEqual(dest, expectedMap);
    });
    it("getObjectsWhichHasKeyInMap", () => {
        let map = {
            obj1: {
                isValid: func1
            },
            obj3: {
                isValid: func2
            }
        };

        let exptectedArray = [
            {
                isValid: func1
            },
            {
                isValid: func2
            }
        ];
        chai.assert.deepEqual(exptectedArray, Maps.getObjectsWhichHasKeyInMap(map, "isValid"));

        map = {
            obj1: {
                isValid: func1
            },
            obj3: {
                isValid: "string"
            }
        };

        exptectedArray = [
            {
                isValid: func1
            }
        ];
        chai.assert.deepEqual(exptectedArray, Maps.getObjectsWhichHasKeyInMap(map, "isValid", "function"));
    });
});

