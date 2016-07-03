import React from "react";
import chai from "chai";
import StoreShallowComponent from "components/StoreShallowComponent";
import Store from "stores/Store";
import { RemoteEndPoint } from "index";

class TestComponent extends StoreShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = { test: 0 };
    }
    render(): Object {
        return (
            <div>{this.state.test}</div>
        );
    }
}
describe("StoreShallowComponent.js", () => {
    it("constructors", () => {
        let result = false;
        let compCount = StoreShallowComponent.componentCount;
        try {
            let test1 = new TestComponent();// eslint-disable-line 
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Sould not allow undefined props");
        chai.assert.equal(StoreShallowComponent.componentCount, compCount, "Component count must remain same");

        result = false;
        try {
            let test1 = new TestComponent({});// eslint-disable-line 
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Sould not allow undefined props.stores");
        chai.assert.equal(StoreShallowComponent.componentCount, compCount, "Component count must remain same");

        result = false;
        try {
            let test1 = new TestComponent({ stores: [] });// eslint-disable-line 
        } catch (e) {
            result = true;
        }
        chai.assert.isOk(result, "Sould not allow empty props.stores");
        chai.assert.equal(StoreShallowComponent.componentCount, compCount, "Component count must remain same");
    });

    it("getObjectId", () => {
        let props = { stores: [{}] };
        let test1 = new TestComponent(props);
        let test2 = new TestComponent(props);
        chai.assert.operator(test1.getObjectId(), "<", test2.getObjectId());
    });
    it("getStore", () => {
        let props = { stores: [new Store({
                endPoint: new RemoteEndPoint({
                    url: "posts"
                })
        })] };
        let test = new TestComponent(props);
        chai.assert.isDefined(test.getStore(), "Store should not be undefined.");
    });
    // it("register", () => {
    //     let props = { stores: [new Store({ key: "sample" })] };
    //     let test = new TestComponent(props);
    //     TestUtils.renderIntoDocument(test);
    //     TestUtils.renderIntoDocument(new TestComponent(props));
    // });
});
