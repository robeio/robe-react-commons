import React from "react";
import Assertions from "../utils/Assertions";
import Maps from "../utils/Maps";
import BinderClass from "../utils/BinderClass";

/**
 * Base of Store to keep data and to trigger dependencies component.
 */
export default class BaseStore extends BinderClass {
    static propTypes = {
        idField: React.PropTypes.string,
        importer: React.PropTypes.func,
        result: React.PropTypes.shape({
            data: React.PropTypes.array,
            totalCount: React.PropTypes.number
        }),
        loadProps: React.PropTypes.object
    };

    static defaultPropTypes = {
        idField: "oid",
        autoLoad: false,
        importer: (response: any): any => {
            return response;
        },
        /*
         * A result which holds default totalCount and data to return if store not initialize
         */
        result: {
            data: [],
            totalCount: 0
        }
    };
    static storeCount = 0;
    /**
     * An number which holds error code of the last operation.
     * @type {Map { code, message}}
     */
    __error ;
    /**
     * A Map which holds properties of the store.
     * @type {Object}
     */
    __props: Object;

    /**
     * A Map which holds registered components to the store.
     * @type {{Object}}
     * @protected
     */
    __registeredObjects: Object = {};

    /**
     * Example props parameter
     * <pre><code>
     super({
            endPoint: new EndPoint({
                url: "menus"
            }),
            id: "newStore",
            autoLoad: true
        });
     ]
     * </code></pre>
     * @param {Object} props
     */
    constructor(props) {
        super();
        this.__props = Maps.merge(BaseStore.defaultPropTypes, {});
        this.__props = Maps.merge(props, this.__props);
        this.__props.objectId = BaseStore.storeCount++;
        Assertions.isFunction(this.__props.importer, true);

        if (this.__props.autoLoad === true) {
            this.load(this.__props.onSuccess, this.__props.onError);
        }
    }

    /**
     * Return A Map which holds properties for the store.
     * @returns {Object}
     */
    getObjectId(): number {
        return this.__props.objectId;
    }

    /**
     * Return A Map which holds properties for the store.
     * @returns {Object}
     */
    getProps(): Object {
        return this.__props;
    }

    /**
     * Store Class name
     * @returns {string}
     */
    getName(): string {
        return this.constructor.name;
    }
    setResult(data: Array, totalCount: number) {
        this.__props.result = {
            data,
            totalCount
        };
    }
    /**
     *
     *
     * @returns {object}
     */
    getResult(): Object {
        return this.__props.result;
    }
    /**
     *
     * @param component
     * @param key
     */
    register(object) {
        Assertions.isNotUndefined(object, true);
        this.__registeredObjects[object.getName() + object.getObjectId()] = object;
        if (this.__props.result.data.length > 0) {
            this._dispatchChange(object);
        }
    }
    /**
     *
     * @param id
     * @param component
     * @param key
     * @returns {*}
     */
    unRegister(object): number {
        Assertions.isNotUndefined(object, true);
        delete this.__registeredObjects[object.getName() + object.getObjectId()];
        if (Object.keys(this.__registeredObjects).length === 0) {
            setTimeout(this._disposeContent, 1500);
        }
        return Object.keys(this.__registeredObjects).length;
    }

    /**
     * call registered objects when data changed.
     * @protected
     */
    _dispatchChanges() {
        Maps.forEach(this.__registeredObjects, (object) => {
            this._dispatchChange(object);
        });
    }

    /**
     * call registered object when data changed.
     * @param {Object} object
     * @protected
     */
    _dispatchChange(object: Object) {
        object.triggerChange(this);
    }

    /**
     *
     * @private
     */
    _disposeContent() {
        if (Object.keys(this.__registeredObjects).length === 0) {
            // TODO: Do all stuff
        }
    }

    /* eslint-disable no-unused-vars */
    load(onSuccess: Function, onError: Function) {
        throw new Error("Not implemented ! ");
    }
}
