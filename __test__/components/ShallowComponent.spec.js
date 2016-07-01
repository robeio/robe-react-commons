import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import ShallowComponent from "components/ShallowComponent";

describe("ShallowComponent.js", () => {
    class TestComponent extends ShallowComponent {
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
    const shallow = (
        <ShallowComponent>
            <div>ShallowComponent</div>
        </ShallowComponent>
    );
    const test = (
        <TestComponent />
    );

    let renderedItem = TestUtils.renderIntoDocument(shallow);

    it("getName", () => {
        chai.assert.equal(renderedItem.getName(), "ShallowComponent");
    });

    it("render", () => {
        let child = TestUtils.findRenderedDOMComponentWithTag(renderedItem, "div");
        chai.assert.equal(child.innerHTML, "ShallowComponent");
    });

    it("shouldComponentUpdate", () => {
        renderedItem = TestUtils.renderIntoDocument(test);
        let child = TestUtils.findRenderedDOMComponentWithTag(renderedItem, "div");
        chai.assert.equal(child.innerHTML, "0");

        let state = { test: 1 };
        renderedItem.setState(state);

        child = TestUtils.findRenderedDOMComponentWithTag(renderedItem, "div");
        chai.assert.equal(child.innerHTML, "1");
    });
});
