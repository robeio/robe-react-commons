import React from "react";
import shallowCompare from "react-addons-shallow-compare";
import Assertions from "../utils/Assertions";
import { ClassInstance } from "../class";
/**
 * A component which extends React.Component and implements shouldComponentUpdate with using shallowCompare and and  __bindAll which binds all methods to the instance.
 * It is like a basic component with minimal update control.
 * Essential to use at flat components whose states or props built by basic types.
 * Essential to use at all components if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class ShallowComponent
 * @extends {React.Component}
 */
export default class ShallowComponent extends React.Component {

    /**
     * Creates an instance of ShallowComponent.
     * @param {Object} props
     */
    constructor(props: Object) {
        super(props);
        ClassInstance.bindAll(this);
    }

    /**
     * Renders component with its children tags.
     * @returns {string}
     */
    render(): string {
        return this.props.children;
    }
    /**
     * Decides ant update is necessary for re-rendering.
     * Compares old props and state objects with the newer ones without going deep.
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {boolean} "true" component shoud update ,"false" otherwise.
     */
    shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
        return shallowCompare(this, nextProps, nextState);
    }

    /**
     * Returns class name of the component.
     * @return {string} name.
     */
    getName = (): string => {
        return this.constructor.name;
    }
}
