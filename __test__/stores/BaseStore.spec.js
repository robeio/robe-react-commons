import React from "react";
import BaseStore from "stores/BaseStore";
import Store from "stores/Store";
import StoreComponent from "components/StoreComponent";
import Assertions from "utils/Assertions";
import chai from "chai";
import { RemoteEndPoint } from "index";
import TestUtils from "react-addons-test-utils";


/** @test {BaseStore} */

describe("BaseStore.js", () => {
    const url = "http://localhost:3000/posts";

        let store = new BaseStore({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            autoLoad: false,
            idField: "id"
        });


    it("load", () => {
        chai.assert.throws(() => {
            store.load();
        }, "Not implemented ! ", undefined, "Must throw an exception");
    });


    /** @test {BaseStore#unRegister} */
    it("unRegister", () => {
        // Render a checkbox with label in the document
        class TestComponent extends StoreComponent {
            constructor(props: Object) {
                super(props);
                this.state = {
                    size: props.stores[0].getResult().data.length
                };
            }
            render(): string {
                return (<div>{this.state.size}</div>);
            }
            triggerChange(store: Store) {
                this.setState({
                    size: store.getResult().data.length
                });
            }
        }

        let test = TestUtils.renderIntoDocument(<TestComponent stores={[store]} />);

        let domNode = TestUtils.findRenderedDOMComponentWithTag(test, "div");
        chai.assert.equal(domNode.innerText, 0);

        store.unRegister(test);
        store._disposeContent();
    });

});
