import React from "react";
import Store from "stores/Store";
import StoreShallowComponent from "components/StoreShallowComponent";
import { RemoteEndPoint } from "index";

import chai from "chai";
import TestUtils from "react-addons-test-utils";


/** @test {SuperStore} */
class StoreShallowComponentTest extends StoreShallowComponent {
    render(): string {
        if (this.state) {
            console.log(this.state.newStore);
        } else {
            console.log("state is null ! ");
        }
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
    it("getProps = (): Object", () => {
        chai.assert.equal(store.getProps().autoLoad, true);
    });
    /** @test {SuperStore#getObjectId} */
    it("getObjectId = (): number", () => {
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
    it("getName = (): string", () => {
        let expectedName = "Store";
        chai.assert.equal(store.getName(), expectedName);
    });
    /** @test {SuperStore#getId} */
    it("getId = (): string", () => {
        let expectedId = "newStore";
        chai.assert.equal(store.getId(), expectedId);
    });
    /** @test {SuperStore#getResult} */
    it("getResult = ()", () => {
        // result is empty check
        chai.assert.deepEqual(store.getResult().data, []);
        chai.assert.deepEqual(store.getResult().totalCount, 0);
        // TODO async calling must to test.
    });
    /** @test {SuperStore#register} */
    it("register = (component: StoreShallowComponent)", () => {
         // Render a checkbox with label in the document
          
        const storeShallowComponentTest = TestUtils.renderIntoDocument(
            <StoreShallowComponentTest stores={[store]} />
        );
        console.log(storeShallowComponentTest);
    });
    /** @test {SuperStore#unRegister} */
    it("unRegister = (component: StoreShallowComponent): number", () => {

    });
    /** @test {SuperStore#triggerChanges} */
    it("triggerChanges = (): void", () => {

    });
    /** @test {SuperStore#triggerChange} */
    it("triggerChange = (component: StoreShallowComponent): void", () => {

    });
    /** @test {SuperStore#_onSuccess} */
    it("_onSuccess(operator: string, result: Map): boolean", () => {

    });
    /** @test {SuperStore#_onError} */
    it("_onError(operator: string, errorCode: number, error: string): boolean", () => {

    });
    /** @test {SuperStore#__successCallback} */
    it("__successCallback(operator: string, successCallback: Function): Function", () => {

    });
    /** @test {SuperStore#__errorCallBack} */
    it(" __errorCallBack(operator: string, errorCallback: Function): Function", () => {

    });
    /** @test {SuperStore#read} */
    it("read(_offset, _limit, _query, code, value, fields, successCallback, errorCallback)", () => {

    });
    /** @test {SuperStore#create} */
    it("create(item:Map, successCallback, errorCallback)", () => {

    });
    /** @test {SuperStore#update} */
    it("update(oldItem:Map, newItem:Map, successCallback, errorCallback)", () => {

    });
    /** @test {SuperStore#delete} */
    it("delete(item:Map, successCallback, errorCallback)", () => {

    });
});
