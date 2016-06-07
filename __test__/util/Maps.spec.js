"use strict";

import Maps from "libs/util/Maps";
import chai from "chai";

describe("Maps.js", () => {

    it("forEach", () => {
        let map = {"key": "a", "value": "a1"};
        let expectedKeyArray = ["key","value"];
        let keyArray = [];
        Maps.forEach(map,function (value,key) {
            keyArray.push(key);
        });
        chai.assert.deepEqual(keyArray,expectedKeyArray);
    });
    it("toArray", () => {
        let map = {"key": "a", "value": "a1"};
        let expectedKeyArray = ["a","a1"];
        let keyArray = Maps.toArray(map);
        chai.assert.deepEqual(keyArray,expectedKeyArray);
    });

    it("merge", () => {
        let src = {"key": "a"};
        let dest = {"value": "a1"};
        let expectedMap = {"key": "a", "value": "a1"};
        Maps.merge(src,dest);
        chai.assert.deepEqual(dest,expectedMap);
    });


    it("mergeMissing", () => {
        let src1 = {"key": "a"};
        let src2= {"key": "a2"};
        let dest = {"value": "a1"};
        let expectedMap = {"key": "a", "value": "a1"};
        Maps.mergeMissing(src1,dest);
        chai.assert.deepEqual(dest,expectedMap);
        Maps.mergeMissing(src2,dest);
        chai.assert.deepEqual(dest,expectedMap);
    });
});