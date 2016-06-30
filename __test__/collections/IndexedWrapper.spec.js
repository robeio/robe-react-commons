import IndexedWrapper from "collections/IndexedWrapper";
import chai from "chai";

describe("IndexedWrapper.js", () => {
    let data = [
        { id: 1, name: "123" },
        { id: 2, name: "234" },
        { id: 3, name: "345" },
        { id: 4, name: "456" },
        { id: 5, name: "567" },
        { id: 6, name: "678" }
    ];

    let wrapper = new IndexedWrapper(data, "id");

    it("alternateConstructor", () => {
        let wrapper2 = new IndexedWrapper(data);
        let item = { id: 7, name: "789" };
        chai.assert.equal(wrapper2.add(item), false);
    });

    it("add", () => {
        let item = { id: 7, name: "789" };
        // First add
        chai.assert.equal(wrapper.add(item), item);
        // Try to add again.
        chai.assert.equal(wrapper.add(item), false);
    });

    it("replace", () => {
        let oldItem = { id: 2, name: "234" };
        let newItem = { id: 2, name: "235" };
        let wrongItem = { id: 9, name: "235" };
        // First replace
        chai.assert.equal(wrapper.replace(oldItem, newItem), newItem);

        chai.assert.equal(wrapper.replace(wrongItem, newItem), false);
    });

    it("remove", () => {
        let item = { id: 2, name: "234" };
        chai.assert.equal(wrapper.remove(item), 0);

        chai.assert.equal(wrapper.remove(item), -1);
    });
});
