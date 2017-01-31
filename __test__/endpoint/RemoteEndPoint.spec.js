import RemoteEndPoint from "endpoint/RemoteEndPoint";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import Arrays from "utils/Arrays";// eslint-disable-line
import { asyncIt } from "../TestUtils";

describe("endpoint/RemoteEndPoint.js", () => {
    const url = "http://localhost:3000/posts";
    // The order of the tests are important. It will be one item that will me
    // created,updated,deleted and readed after every operation.
    let item = { id: new Date().getTime(), title: "Post" };

    function checkResponseProps(result: Object) {
        chai.assert.isDefined(result.data, "Response data should not be undefined.");
        chai.assert.isDefined(result.totalCount, "Response totalCount should not be undefined.");
        chai.assert.isNotNaN(result.totalCount, "Response totalCount should not be NaN.");
    }

    it("constructor - read", () => {
        let props = {
            url: url,
            read: {
                type: "GET"
            }
        };
        let endpoint = new RemoteEndPoint(props);
        chai.assert.equal(endpoint._transport.read.url, props.url);

        props.read.url = "test";
        endpoint = new RemoteEndPoint(props);
        chai.assert.equal(endpoint._transport.read.url, props.read.url);
    });
    it("constructor - create", () => {
        let props = {
            url: url,
            create: {
                type: "GET"
            }
        };
        let endpoint = new RemoteEndPoint(props);
        chai.assert.equal(endpoint._transport.create.url, props.url);

        props.create.url = "test";
        endpoint = new RemoteEndPoint(props);
        chai.assert.equal(endpoint._transport.create.url, props.create.url);
    });
    it("constructor - update", () => {
        let props = {
            url: url,
            update: {
                type: "GET"
            }
        };
        let endpoint = new RemoteEndPoint(props);
        chai.assert.equal(endpoint._transport.update.url, props.url);

        props.update.url = "test";
        endpoint = new RemoteEndPoint(props);
        chai.assert.equal(endpoint._transport.update.url, props.update.url);
    });

    it("constructor - delete", () => {
        let props = {
            url: url,
            delete: {
                type: "GET"
            }
        };
        let endpoint = new RemoteEndPoint(props);
        chai.assert.equal(endpoint._transport.delete.url, props.url);

        props.delete.url = "test";
        endpoint = new RemoteEndPoint(props);
        chai.assert.equal(endpoint._transport.delete.url, props.delete.url);
    });
    it("getUrl", () => {
        let endpoint = new RemoteEndPoint({ url: url });
        chai.assert.equal(endpoint.getUrl(), url);
    });
    it("setReadUrl", () => {
        let endpoint = new RemoteEndPoint({ url: url });
        endpoint.setReadUrl("test");
        chai.assert.equal(endpoint._readRequest.__url, "test");

    });
    it("read", (done: Function) => {
        let endpoint = new RemoteEndPoint({ url: url });

        function success(result: Object) {
            checkResponseProps(result);
            let hasItem = Arrays.isExistByKey(result.data, "id", item);
            chai.assert.isNotOk(hasItem, "Item is not created yet but it is coming at the start. Change DB");
            done();
        }
        function error(xhr: Object, errorMessage: string) {
            try {
                chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            } catch (e) {
                done(e);
            }
        }

        endpoint.read(undefined, success, error);
    });
    asyncIt("create", (done: Function) => {
        let endpoint = new RemoteEndPoint({ url: url });

        function success(result: Object) {
            checkResponseProps(result);
            chai.assert.deepEqual(result.data, item, "Created item returned different from server.");
            done();
        }
        function error(xhr: Object, errorMessage: string) {
            try {
                chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            } catch (e) {
                done(e);
            }
        }
        endpoint.create(item, success, error);
    });
    it("update", (done: Function) => {
        let endpoint = new RemoteEndPoint({ url: url });

        item.title = "NewPost";

        function success(result: Object) {
            checkResponseProps(result);
            chai.assert.deepEqual(result.data, item, "Created item returned different from server.");
            done();
        }
        function error(xhr: Object, errorMessage: string) {
            try {
                chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            } catch (e) {
                done(e);
            }
        }
        endpoint.update(item, "id", success, error);
    });
    it("delete", (done: Function) => {
        let endpoint = new RemoteEndPoint({ url: url });

        function success(result: Object) {
            checkResponseProps(result);
            done();
        }
        function error(xhr: Object, errorMessage: string) {
            try {
                chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            } catch (e) {
                done(e);
            }
        }

        endpoint.delete(item, "id", success, error);
    });
});
