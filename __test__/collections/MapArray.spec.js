import MapArray from "collections/MapArray";
import chai from "chai";

const assert = chai.assert;

describe("MapArray.js", () => {
    let data = [
        { id: 1, name: "123" },
        { id: 2, name: "234" },
        { id: 3, name: "345" },
        { id: 4, name: "456" },
        { id: 5, name: "567" },
        { id: 6, name: "678" }
    ];


    it("constructors", () => {
        let item = { id: 2, name: "234" };
        assert.throws(() => {
            /* eslint-disable no-new */
            new MapArray(item);
        }, "Data must be an array of maps.", undefined, "Must throw an exception in case data is not an array");
        assert.doesNotThrow(() => {
            /* eslint-disable no-new */
            new MapArray(data);
        }, "Data must be an array of maps.");
    });

    it("getIdField", () => {
        let maparr = new MapArray(data);
        assert.equal(maparr.getIdField(), "oid", "Default idField must me 'oid' ");
        let maparr2 = new MapArray(data, "id");
        assert.equal(maparr2.getIdField(), "id", "Must return given id field");
    });

    it("find", () => {
        let maparr = new MapArray(data, "id");

        let expected = { id: 4, name: "456" };
        chai.assert.deepEqual(maparr.find(expected), expected, "Can't find item");

        expected = { id: 8, name: "456" };
        chai.assert.isUndefined(maparr.find(expected), "Must be undefined in case item is not available");
    });

    it("getData", () => {
        let maparr = new MapArray(data, "id");
        chai.assert.deepEqual(maparr.getData(), data);
    });

    it("add", () => {
        let maparr = new MapArray(data, "id");

        let item = { id: 7, name: "789" };
        chai.assert.equal(maparr.add(item), true, "Must add if it does not exists and return 'true'");

        chai.assert.equal(maparr.add(item), false, "Don't add if it exists and return 'false'");
    });

    it("replace", () => {
        let maparr = new MapArray(data, "id");
        let newItem = { id: 2, name: "235" };
        chai.assert.equal(maparr.replace(newItem), true, "Must replace if exists and return 'true'");
    });

    it("remove", () => {
        let maparr = new MapArray(data, "id");

        let item = { id: 2, name: "234" };
        chai.assert.equal(maparr.remove(item), true, "Must remove if exists and return 'true'");

        chai.assert.equal(maparr.remove(item), false, "Don't remove if not exists and return 'false'");
    });
});
