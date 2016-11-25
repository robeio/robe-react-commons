import React from "react";// eslint-disable-line
import BaseStore from "stores/BaseStore";// eslint-disable-line
import Store from "stores/Store";// eslint-disable-line
import StoreComponent from "components/StoreComponent";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import { RemoteEndPoint } from "index";// eslint-disable-line
import TestUtils from "react-addons-test-utils";// eslint-disable-line import/no-extraneous-dependencies


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
            triggerChange(newStore: Store) {
                this.setState({
                    size: newStore.getResult().data.length
                });
            }
        }

        let test = TestUtils.renderIntoDocument(<TestComponent stores={[store]} />);

        let domNode = TestUtils.findRenderedDOMComponentWithTag(test, "div");
        chai.assert.equal(domNode.innerText, 0);

        store.unRegister(test);
        store._disposeContent();// eslint-disable-line no-underscore-dangle
    });
});
