import MapArray from "collections/MapArray";
import chai from "chai";

describe("MapArray.js", () => {
    let data = [
        { id: 1, name: "123" },
        { id: 2, name: "234" },
        { id: 3, name: "345" },
        { id: 4, name: "456" },
        { id: 5, name: "567" },
        { id: 6, name: "678" }
    ];

    let maparr = new MapArray(data, "id");

    it("alternative constructor", () => {
        let item = { id: 2, name: "234" };
        let result = false;
        try {
            let maparr2 = new MapArray(item);
            maparr2.find(item);
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
        try {
            let maparr2 = new MapArray(data);
            maparr2.find(item);
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Exception expected.");
    });

    it("find", () => {
        let expected = { id: 4, name: "456" };
        chai.assert.deepEqual(maparr.find(expected), expected);

        expected = { id: 8, name: "456" };
        chai.assert.isUndefined(maparr.find(expected));
    });

    it("getData", () => {
        chai.assert.deepEqual(maparr.getData(), data);
    });

    it("add", () => {
        let item = { id: 7, name: "789" };
        // First add
        chai.assert.equal(maparr.add(item), true);
        // Try to add again.
        chai.assert.equal(maparr.add(item), false);
    });

    it("replace", () => {
        let oldItem = { id: 2, name: "234" };
        let newItem = { id: 2, name: "235" };
        let wrongItem = { id: 9, name: "235" };
        // First replace
        chai.assert.equal(maparr.replace(oldItem, newItem), true);

        chai.assert.equal(maparr.replace(wrongItem, newItem), false);
    });

    it("remove", () => {
        let item = { id: 2, name: "234" };
        chai.assert.equal(maparr.remove(item), true);

        chai.assert.equal(maparr.remove(item), false);
    });
});
