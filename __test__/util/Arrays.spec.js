"use strict";

import Arrays from "libs/util/Arrays";
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

    it("findIndex", ()=> {
        let array = ["a", "b", "c"];
        chai.assert.equal(Arrays.findIndex(array, "a"), 0);
        chai.assert.equal(Arrays.findIndex(array, "b"), 1);
        chai.assert.equal(Arrays.findIndex(array, "d"), -1);
    });
    it("findIndexByProperty", ()=> {
        let array = [
            {"key": "a", "value": "a1"},
            {"key": "b", "value": "b1"},
            {"key": "c", "value": "c1"}];
        chai.assert.equal(Arrays.findIndexByProperty(array, "key","a"), 0);
        chai.assert.equal(Arrays.findIndexByProperty(array, "key","b"), 1);
        chai.assert.equal(Arrays.findIndexByProperty(array, "key","d"), -1);
    });

    it("extractArray", () => {
        let array = [
            {"key": "a", "value": "a1"},
            {"key": "b", "value": "b1"},
            {"key": "c", "value": "c1"}];
        let expectedKeyArray = ["a","b","c"];
        let valueArray = Arrays.extractArray(array,"key");
        chai.assert.deepEqual(valueArray,expectedKeyArray);
    });


});