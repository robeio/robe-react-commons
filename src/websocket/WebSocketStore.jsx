import Maps from "../utils/Maps";
import Class from "../class/Class";

/**
 * An Web Socket Store class.
 * @export
 * @class WebSocketStore
 */
export default class WebSocketStore extends Class {

    /**
     * @type {WebSocket}
     */
    __webSocket = undefined;

    /**
     *  Keeps a record list of incoming messages
     *
     * @type {Array}
     */
    __registerList = [];


    /**
     * Default properties for a WebSocket.
     * @type {Object}
     */
    props:Object = {
        onOpen: function (response) {
            console.log("WebSocket Connected", response.currentTarget.url);
        },
        onMessage: this.__onMessage,
        onClose: function (response) {
            console.log("WebSocket Closed", response.currentTarget.url);
        },
        onError: function (response) {
            console.log("WebSocket Error", response.currentTarget.url);
        }
    };

    /**
     * Creates an instance of WebSocketStore.
     *
     * @param {Object} props
     */
    constructor(props:Object) {
        super();
        if (props == undefined)
            this.__requiredControl("'props' must be given.", props);

        this.props = Maps.mergeDeep(props, this.props);

        this.connect();
    }

    /**
     * If the WebSocket is not connected, binds
     */
    connect() {
        if (this.isConnected()) {
            console.log("WebSocket is already connected.");
            return;
        }

        if (this.props.url == undefined)
            this.__requiredControl("'url' must be defined at 'props'.", this.props.url);

        try {
            this.__webSocket = new WebSocket(this.props.url);

            this.__webSocket.onopen = this.props.onOpen;
            this.__webSocket.onmessage = this.props.onMessage;
            this.__webSocket.onclose = this.props.onClose;
            this.__webSocket.onerror = this.props.onError;

        } catch (error) {
            console.error(error);
            this.__webSocket = undefined;
        }
    };

    /**
     *  Returns whether WebSocket is connected.
     *
     * @returns {boolean}
     */
    isConnected() {
        if (this.__webSocket == undefined) {
            return false;
        }
        return (this.__webSocket.readyState === WebSocket.CONNECTING || this.__webSocket.readyState === WebSocket.OPEN );
    };

    /**
     *  Closes if the WebSocket is connected.
     */
    close() {
        if (this.isConnected()) {
            this.__webSocket.close();
            return;
        }
        console.error("WebSocket is not already connected.");
    };

    /**
     *  Adds to the record list from which incoming messages are sent
     *
     * @param id
     * @param type
     * @param callback
     */
    register(id, type, callback) {
        this.__registerList.push({
            "id": id,
            "type": type,
            "callback": callback
        });
    };

    /**
     * Delete from list of contacts to which incoming messages are sent
     *
     * @param id
     */
    unRegister(id:Object) {
        for (var i = this.__registerList.length; i--;) {
            if (this.__registerList[i]["id"] == id) {
                this.__registerList.splice(i, 1);
            }
        }
    };

    /**
     *  If the WebSocket is connected send the packet.
     *
     * @param packet
     */
    send(packet:Object) {
        if (this.isConnected()) {
            this.__webSocket.send(JSON.stringify(packet));
            return;
        }
        console.error("The message could not be sent. WebSocket is not connected.");
    };

    /**
     * Sends incoming messages to the record list
     *
     * @param response
     * @private
     */
    __onMessage(response:Object) {
        var event = JSON.parse(response.data);
        for (var i = 0; i < this.__registerList.length; i++) {
            if (this.__registerList[i].type === event.type) {
                try {
                    this.__registerList[i].callback(event);
                } catch (e) {
                    console.warn("WebSocket Trigger change error", e);
                }
            }
        }
    };


    /**
     *
     * @param message
     * @param obj
     * @private
     */
    __requiredControl(message:Object, obj:Object) {
        if (obj === undefined) {
            console.error(message);
            throw message;
        }
    };
}