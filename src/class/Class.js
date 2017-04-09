import {Component} from "react";
import Assertions from "../utils/Assertions";


const es6Methods = [
    "constructor"
];


const reactMethods = [
    "constructor",
    "componentWillMount",
    "render",
    "componentDidMount",
    "componentWillReceiveProps",
    "shouldComponentUpdate",
    "componentWillUpdate",
    "render",
    "componentDidUpdate",
    "componentWillUnmount",
    "setState",
    "forceUpdate"
];

/**
 * A class which  implements __bindAll which binds all methods to the instance.
 * Essential to use at all classes if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class Class
 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["bindAll"] }] */

export default class Class {
    constructor() {
        this.bindAll(this);
    }

    /**
     * Binds all methods to the instance.
     * @param {Object} instance to bind
     */
    bindAll(instance:Object) {
        var list = ["Object", "ReactComponent", "Component", "Class", "Date", "File"];
        var parent = Object.getPrototypeOf(instance);
        var bindedKeys = [];
        var constructorName = parent.constructor.name || parent.constructor.toString().match(/^function\s*([^\s(]+)/)[1];
        while (list.indexOf(constructorName) === -1) {
            var names = Object.getOwnPropertyNames(parent);
            for (var i = 0; i < names.length; i += 1) {
                var name = names[i];
                var restrictMethods = instance instanceof Component ? reactMethods : es6Methods;
                if (restrictMethods.indexOf(name) === -1 && Assertions.isFunction(instance[name])) {
                    if (!bindedKeys[name]) {
                        instance[name] = instance[name].bind(instance);
                        bindedKeys[name] = true;
                    }
                }
            }
            parent = Object.getPrototypeOf(parent);
        }
    }
}
