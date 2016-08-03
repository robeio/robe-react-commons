import React from "react";
import Assertions from "../utils/Assertions";
import ShallowComponent from "./ShallowComponent";

/**
 * A component which extends ShallowComponent and implements __bindAll which binds all methods to the instance.
 * Essential to use at all components if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class BinderShallowComponent
 * @extends {ShallowComponent}
 */
export default class BinderShallowComponent extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.__bindAll(this);
    }

/**
 * Binds all methods to the instance.
 * @param {Object} instance to bind
 */
    __bindAll(instance: Object) {
        let names = Object.getOwnPropertyNames(instance);
        for (let name of names) {
            if (name !== "constructor" && Assertions.isFunction(instance[name])) {
                instance[name] = instance[name].bind(this);
            }
        }
        if (instance.constructor.name !== "BinderShallowComponent") {
            this.__bindAll(Object.getPrototypeOf(instance));
        }
    }
}