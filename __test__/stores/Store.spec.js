import Application from "application/Application";
import React from "react";
import Store from "stores/Store";
import StoreShallowComponent from "components/StoreShallowComponent";
import Assertions from "utils/Assertions";
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
    const url = "http://localhost:3000/posts";
    /** @test {Store#constructor} */
    it("constructors", () => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            })
        });
        chai.assert.operator(store.getObjectId(), ">=", 0);
        chai.assert.isTrue(Assertions.isFunction(store.getProps().importer), true);
        chai.assert.equal(store.getProps().idField, "oid");
        chai.assert.equal(store.getProps().autoLoad, false);

        store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            autoLoad: true,
            idField: "id"
        });
        chai.assert.operator(store.getObjectId(), ">=", 0);
        chai.assert.isTrue(Assertions.isFunction(store.getProps().importer), true);
        chai.assert.equal(store.getProps().idField, "id");
        chai.assert.equal(store.getProps().autoLoad, true);
    });
    /** @test {Store#getProps} */
    it("getProps", () => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            autoLoad: true,
            idField: "id",
            importer: {}
        });
        chai.assert.operator(store.getObjectId(), ">=", 0);
        chai.assert.isFalse(Assertions.isFunction(store.getProps().importer), true);
        chai.assert.equal(store.getProps().idField, "id");
        chai.assert.equal(store.getProps().autoLoad, true);
    });
    /** @test {Store#getObjectId} */
    it("getObjectId", () => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            })
        });
        let store2 = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            })
        });
        chai.assert.operator(store.getObjectId(), ">=", 0);
        chai.assert.operator(store2.getObjectId(), ">", store.getObjectId());
    });
    /** @test {Store#getName} */
    it("getName", () => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            })
        });
        chai.assert.equal(store.getName(), "Store");
    });

    /** @test {Store#getResult} */
    it("getResult", (done) => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            autoLoad: true,
            onSuccess: (result: Map) => {
                chai.assert.isArray(result.data);
                chai.assert.isNumber(result.totalCount);
                done();
            },
            onError: (errorCode, errorMessage) => {
                done();
            }
        });
        let expectedDefaultResult = {
            data: [],
            totalCount: 0
        };
        // default check code.
        chai.assert.deepEqual(store.getResult(), expectedDefaultResult);
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
