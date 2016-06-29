import AjaxRequest from "connections/AjaxRequest";
import chai from "chai";

describe("AjaxRequest.js", () => {
    it("callComplete", (done: Function) => {
        let props = {
            url: "http://jsonplaceholder.typicode.com/posts/1",
            async: false,
            type: "GET"
        };

        function success() {
            chai.assert.isOk(true);
            done();
        }
        function error(xhr: Object) {
            chai.assert.isOk(false);
            done(xhr);
        }
        let request = new AjaxRequest(props);
        request.call(undefined, undefined, success, error);
        request.call();
    });
    it("callError", (done: Function) => {
        let props = {
            url: "http://jsonplaceholder.typicode/",
            async: false,
            type: "GET"
        };

        function success(xhr: Object) {
            chai.assert.isOk(false);
            done(xhr);
        }
        function error() {
            chai.assert.isOk(true);
            done();
        }
        let request = new AjaxRequest(props);
        request.call(undefined, undefined, success, error);
    });
    it("callVariations", (done: Function) => {
        let props = {
            url: "http://jsonplaceholder.typicode.com/posts/1",
            async: false,
            type: "GET"
        };
        let request = new AjaxRequest(props);
        function success(xhr: Object) {
            chai.assert.isOk(false);
            done(xhr);
        }
        function error() {
            chai.assert.isOk(true);
            done();
        }
        request.call({}, undefined, success, error);
        request.call({}, {}, success, error);
    });
    it("callQueryParams", (done: Function) => {
        let props = {
            url: "http://jsonplaceholder.typicode.com/posts/1",
            async: false,
            type: "GET"
        };
        let request = new AjaxRequest(props);
        function success(xhr: Object) {
            chai.assert.isOk(false);
            done(xhr);
        }
        function error() {
            chai.assert.isOk(true);
            done();
        }
        let queryParams = {
            offset: 0,
            limit: 10,
            query: "a",
            filter: "a=b",
            fields: "id,name"
        };
        request.call({}, queryParams, success, error);
        request.call({}, {}, success, error);
    });
});
