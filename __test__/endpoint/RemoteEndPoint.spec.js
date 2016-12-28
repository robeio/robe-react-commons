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

    it("constructor", () => {
        // let props = {
        //     read: {
        //         url: "test",
        //         type: "GET"
        //     }
        // };
        // let endpoint = new RemoteEndPoint({ url: props });

        // chai.assert.equal(endpoint.getUrl().read, props);
    });

    it("getUrl", () => {
        let endpoint = new RemoteEndPoint({ url: url });

        chai.assert.equal(endpoint.getUrl(), url);
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
