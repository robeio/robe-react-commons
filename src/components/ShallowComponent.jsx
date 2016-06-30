/* eslint no-useless-constructor: 0*/
import React from "react";
import shallowCompare from "react-addons-shallow-compare";

/**
 * A component which extends React.Component and implements shouldComponentUpdate with using shallowCompare.
 */
export default class ShallowComponent extends React.Component {

    constructor(props: Object) {
        super(props);
    }

    render(): string {
        return this.props.children;
    }
    shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
        return shallowCompare(this, nextProps, nextState);
    }

    getName = (): string => {
        return this.constructor.name;
    }
}
