import React from "react";
import shallowCompare from "react-addons-shallow-compare";

class ShallowComponent extends React.Component {

    constructor(props: Object) {
        super(props);
    }

    render() : string {
        return this.props.children;
    }

    shouldComponentUpdate(nextProps : Object, nextState : Object) : boolean {
        return shallowCompare(this, nextProps, nextState);
    }
}

module.exports = ShallowComponent;
