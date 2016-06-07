"use strict";

import Objects from "utils/Objects";
import chai from "chai";

/** @test {ClassDocBuilder} */

describe("utils/Objects", () => {
    it("equals(src: any, dest: any) : checks equality of the given source map and destination map", () => {
        let map1 = {"key": "a", "value": "a1"};
        let map2 = {"key": "a", "value": "a1"};
        let map3 = {"key": "a", "value": "a2"};
        chai.assert.equal(Objects.equals(map1,map2),true);
        chai.assert.equal(Objects.equals(map1,map3),false);
    });
    it("deepCopy(src : any) : checks equality of the given source map and its clone ", () => {
        let map1 = {"key": "a", "value": "a1"};
        let map2 = Objects.deepCopy(map1);
        chai.assert.deepEqual(map1,map2);
    });

});