import AjaxRequest from "connections/AjaxRequest";
import chai from "chai";

describe("AjaxRequest.js", () => {
    it("callEmpty", (done: Function) => {
        let props = {
            url: "http://httpbin.org/get",
            async: false,
            type: "GET"
        };
        let request = new AjaxRequest(props);
        request.call();
        done();
    });
    it("callComplete", (done: Function) => {
        let props = {
            url: "http://httpbin.org/get",
            type: "GET",
            async: false,
        };

        function success() {
            chai.assert.isOk(true);
            done();
        }
        function error(xhr: Object) {
            chai.assert.isOk(false, xhr);
            done(xhr);
        }
        let request = new AjaxRequest(props);
        request.call(undefined, undefined, success, error);
    });
    it("callError", (done: Function) => {
        let props = {
            url: "http://jsonplaceholder.typi",
            type: "GET",
            async: false,

        };

        function success(xhr: Object) {
            chai.assert.isOk(false, xhr);
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
            url: "http://httpbin.org/get",
            type: "GET"
        };
        let request = new AjaxRequest(props);
        function success() {
            chai.assert.isOk(true);
            done();
        }
        function error(xhr: Object) {
            chai.assert.isOk(false);
            done(xhr);
        }
        request.call({}, undefined, success, error);
        request.call({}, {}, success, error);
    });
    it("callQueryParams", (done: Function) => {
        let props = {
            url: "http://httpbin.org/get",
            type: "GET"
        };
        let request = new AjaxRequest(props);
        function success() {
            chai.assert.isOk(true);
            done();
        }
        function error(xhr: Object) {
            chai.assert.isOk(false, xhr);
            done(xhr);
        }
        let queryParams = {
            offset: 0,
            limit: 10,
            query: "a",
            filter: "a=b",
            fields: "id,name"
        };
        request.call({}, queryParams, success, error);
    });
});
