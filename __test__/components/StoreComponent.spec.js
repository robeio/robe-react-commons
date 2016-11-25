import React from "react";// eslint-disable-line
import ReactDOM from "react-dom";
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import StoreComponent from "components/StoreComponent";// eslint-disable-line import/no-extraneous-dependencies,import/extensions,import/no-unresolved
import Store from "stores/Store";// eslint-disable-line import/no-extraneous-dependencies,import/extensions,import/no-unresolved
import { RemoteEndPoint } from "index";// eslint-disable-line import/no-extraneous-dependencies,import/extensions,import/no-unresolved

class TestComponent extends StoreComponent {
    constructor(props: Object) {
        super(props);
        this.state = { count: 0 };
    }
    render(): Object {
        return (
            <div>{this.state.count}</div>
        );
    }
    triggerChange(store: Store) {
        this.setState({
            count: store.getResult().data.length
        });
    }
}

class TestComponentError extends StoreComponent {
    constructor(props: Object) {
        super(props);
        this.state = { count: 0 };
    }
    render(): Object {
        return (
            <div>{this.state.count}</div>
        );
    }
}
describe("StoreComponent.js", () => {
    const url = "http://localhost:3000/posts";
    it("constructors", () => {
        let compCount = StoreComponent.componentCount;
        chai.assert.throws(() => {
            let test1 = new TestComponent();// eslint-disable-line 
        }, "Must defined at least one store in a TestComponent", undefined, "Sould not allow undefined props");
        chai.assert.equal(StoreComponent.componentCount, compCount, "Component count must remain same");

        chai.assert.throws(() => {
            let test1 = new TestComponent({});// eslint-disable-line 
        }, "Must defined at least one store in a TestComponent", undefined, "Sould not allow undefined props.stores");
        chai.assert.equal(StoreComponent.componentCount, compCount, "Component count must remain same");

        chai.assert.throws(() => {
            let test1 = new TestComponent({ stores: [] });// eslint-disable-line 
        }, "Must defined at least one store in a TestComponent", undefined, "Sould not allow empty props.stores");
        chai.assert.equal(StoreComponent.componentCount, compCount, "Component count must remain same");
    });

    it("getObjectId", () => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            autoLoad: true,
            idField: "id"
        });
        let props = { stores: [store] };
        let test1 = new TestComponent(props);
        let test2 = new TestComponent(props);
        chai.assert.operator(test1.getObjectId(), "<", test2.getObjectId());
    });
    it("getStore", () => {
        let props = {
            stores: [
                new Store({
                    endPoint: new RemoteEndPoint({
                        url: url
                    })
                })
            ]
        };
        let test = new TestComponent(props);
        chai.assert.isDefined(test.getStore(), "Store should not be undefined.");
        chai.assert.equal(test.getStores().length, 1, "Store should not be undefined.");
    });

    it("triggerChange", () => {
        let props = {
            stores: [
                new Store({
                    endPoint: new RemoteEndPoint({
                        url: url
                    })
                })
            ]
        };
        let test = (<TestComponentError {...props} />);
        let test2 = new TestComponentError(props);
        let container = document.createElement("div");
        ReactDOM.render(test, container);
        ReactDOM.unmountComponentAtNode(container);
        chai.assert.throws(() => {
            test2.triggerChange(props.stores[0]);
        }, "Store store couldn't set to the TestComponentError component. Trigger change must be implemented by TestComponentError component", undefined,
            "Unimplemented 'triggerChange' must throw exception");
    });
});
