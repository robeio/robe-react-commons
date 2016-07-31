import RemoteEndPoint from "endpoint/RemoteEndPoint";
import chai from "chai";
import Arrays from "utils/Arrays";

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
            chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            done(xhr);
        }

        endpoint.read(undefined, undefined, undefined, undefined, undefined, success, error);
    });
    it("create", (done: Function) => {
        let endpoint = new RemoteEndPoint({ url: url });

        function success(result: Object) {
            checkResponseProps(result);
            chai.assert.deepEqual(result.data, item, "Created item returned different from server.");
            done();
        }
        function error(xhr: Object, errorMessage: string) {
            chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            done(xhr);
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
            chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            done(xhr);
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
            chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            done(xhr);
        }

        endpoint.delete(item, "id", success, error);
    });
});
