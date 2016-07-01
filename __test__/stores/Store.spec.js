import React from "react";
import Store from "stores/Store";
import StoreShallowComponent from "components/StoreShallowComponent";
import { RemoteEndPoint } from "index";

import chai from "chai";
import TestUtils from "react-addons-test-utils";


/** @test {Store} */
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
        key: "newStore",
        autoLoad: true
    });

    /** @test {Store#getProps} */
    it("getProps", () => {
        chai.assert.equal(store.getProps().autoLoad, true);
    });
    /** @test {Store#getObjectId} */
    it("getObjectId", () => {
        let count = Store.storeCount;
        const store2 = new Store({
            endPoint: new RemoteEndPoint({
                url: "menus"
            }),
            id: "newStore2"
        });

        chai.assert.operator(store2.getObjectId(), ">=", count);
    });
    /** @test {Store#getName} */
    it("getName", () => {
        let expectedName = "Store";
        chai.assert.equal(store.getName(), expectedName);
    });
    /** @test {Store#getKey} */
    it("getKey", () => {
        let expectedId = "newStore";
        chai.assert.equal(store.getKey(), expectedId);
    });
    /** @test {Store#getResult} */
    it("getResult", () => {
        // result is empty check


        const store3 = new Store({
            endPoint: new RemoteEndPoint({
                url: "menus"
            }),
            key: "newStore",
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
    /** @test {Store#register} */
    it("register", () => {
        // Render a checkbox with label in the document
    });
    /** @test {Store#unRegister} */
    it("unRegister", () => {

    });
    /** @test {Store#triggerChanges} */
    it("triggerChanges", () => {

    });
    /** @test {Store#triggerChange} */
    it("triggerChange", () => {

    });
    /** @test {Store#_onSuccess} */
    it("_onSuccess", () => {

    });
    /** @test {Store#_onError} */
    it("_onError", () => {

    });
    /** @test {Store#__successCallback} */
    it("__successCallback", () => {

    });
    /** @test {Store#__errorCallBack} */
    it(" __errorCallBack", () => {

    });
    /** @test {Store#read} */
    it("read", () => {

    });
    /** @test {Store#create} */
    it("create", () => {

    });
    /** @test {Store#update} */
    it("update", () => {

    });
    /** @test {Store#delete} */
    it("delete", () => {

    });
});
