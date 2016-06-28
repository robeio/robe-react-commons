/* eslint no-useless-constructor: 0*/
import React from "react";
import shallowCompare from "react-addons-shallow-compare";

/**
 * A component which extends React.Component and implements shouldComponentUpdate with using shallowCompare.
 */
export default class ShallowComponent extends React.Component {

    static componentCount = 0;
    __objectId;

    constructor(props) {
        super(props);
        this.__objectId = ShallowComponent.componentCount++;
    }

    getObjectId = () => {
        return this.__objectId;
    }

    render(): string {
        return this.props.children;
    }
    shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
        return shallowCompare(this, nextProps, nextState);
    }

    getName = () => {
        return this.constructor.name;
    }
}
