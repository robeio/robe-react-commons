import React from "react";
import Store from "stores/Store";
import StoreShallowComponent from "components/StoreShallowComponent";
import { RemoteEndPoint } from "index";

import chai from "chai";
import TestUtils from "react-addons-test-utils";


/** @test {SuperStore} */
class StoreShallowComponentTest extends StoreShallowComponent {
    render(): string {
        return (
            <div>
            </div>
        );
    }

}
describe("Store.js", () => {
    const store = new Store({
        endPoint: new RemoteEndPoint({
            url: "menus"
        }),
        id: "newStore",
        autoLoad: true
    });

    /** @test {SuperStore#getProps} */
    it("getProps", () => {
        chai.assert.equal(store.getProps().autoLoad, true);
    });
    /** @test {SuperStore#getObjectId} */
    it("getObjectId", () => {
        chai.assert.equal(store.getObjectId(), 0);
        const store2 = new Store({
            endPoint: new RemoteEndPoint({
                url: "menus"
            }),
            id: "newStore2"
        });

        chai.assert.equal(store2.getObjectId(), 1);
    });
    /** @test {SuperStore#getName} */
    it("getName", () => {
        let expectedName = "Store";
        chai.assert.equal(store.getName(), expectedName);
    });
    /** @test {SuperStore#getId} */
    it("getId", () => {
        let expectedId = "newStore";
        chai.assert.equal(store.getId(), expectedId);
    });
    /** @test {SuperStore#getResult} */
    it("getResult", () => {
        // result is empty check


        const store3 = new Store({
            endPoint: new RemoteEndPoint({
                url: "menus"
            }),
            id: "newStore",
            autoLoad: true,
            onSuccess: () => {
                // done();
            },
            onError: () => {
                // done();
            }
        });
        TestUtils.renderIntoDocument(
            <StoreShallowComponentTest stores={[store]} />
        );
        chai.assert.deepEqual(store3.getResult().data, []);
        chai.assert.deepEqual(store3.getResult().totalCount, 0);
        // TODO async calling must to test.
    });
    /** @test {SuperStore#register} */
    it("register", () => {
         // Render a checkbox with label in the document
    });
    /** @test {SuperStore#unRegister} */
    it("unRegister", () => {

    });
    /** @test {SuperStore#triggerChanges} */
    it("triggerChanges", () => {

    });
    /** @test {SuperStore#triggerChange} */
    it("triggerChange", () => {

    });
    /** @test {SuperStore#_onSuccess} */
    it("_onSuccess", () => {

    });
    /** @test {SuperStore#_onError} */
    it("_onError", () => {

    });
    /** @test {SuperStore#__successCallback} */
    it("__successCallback", () => {

    });
    /** @test {SuperStore#__errorCallBack} */
    it(" __errorCallBack", () => {

    });
    /** @test {SuperStore#read} */
    it("read", () => {

    });
    /** @test {SuperStore#create} */
    it("create", () => {

    });
    /** @test {SuperStore#update} */
    it("update", () => {

    });
    /** @test {SuperStore#delete} */
    it("delete", () => {

    });
});
