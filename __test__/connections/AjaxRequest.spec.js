import AjaxRequest from "connections/AjaxRequest";
import chai from "chai";

describe("AjaxRequest.js", () => {
    it("callComplete", (done) => {
        let props = {
            url: "http://jsonplaceholder.typicode.com/posts/1",
            async: false,
            type: "GET"
        };

        function complete() {
            chai.assert.isOk(true);
            done();
        }
        function error(xhr) {
            chai.assert.isOk(false);
            done(xhr);
        }
        let request = new AjaxRequest(props);
        request.call(undefined, undefined, complete, error);
    });
    it("callError", (done) => {
        let props = {
            url: "http://jsonplaceholder.typicode/",
            async: false,
            type: "GET"
        };

        function complete(xhr) {
            chai.assert.isOk(false);
            done(xhr);
        }
        function error() {
            chai.assert.isOk(true);
            done();
        }
        let request = new AjaxRequest(props);
        request.call(undefined, undefined, complete, error);
    });
});
