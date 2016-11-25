import AjaxRequest from "connections/AjaxRequest";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

describe("AjaxRequest.js", () => {
    it("callEmpty", (done: Function) => {
        let props = {
            url: "http://localhost:3000/posts/1",
            async: false,
            type: "GET"
        };
        let request = new AjaxRequest(props);
        request.call();
        done();
    });
    it("callComplete", (done: Function) => {
        let props = {
            url: "http://localhost:3000/posts/1",
            type: "GET",
            async: false,
        };

        function success() {
            chai.assert.isOk(true);
            done();
        }
        function error(xhr: Object, errorMessage: string) {
            chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            done(xhr);
        }
        let request = new AjaxRequest(props);
        request.call(undefined, undefined, success, error);
    });
    it("callError", (done: Function) => {
        let props = {
            url: "http://wrong.web.site",
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
            url: "http://localhost:3000/posts/1",
            type: "GET"
        };
        let request = new AjaxRequest(props);
        function success() {
            chai.assert.isOk(true);
            done();
        }
        function error(xhr: Object, errorMessage: string) {
            chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            done(xhr);
        }
        request.call({}, undefined, success, error);
        request.call({}, {}, success, error);
    });
    it("callQueryParams", (done: Function) => {
        let props = {
            url: "http://localhost:3000/posts",
            type: "GET"
        };
        let request = new AjaxRequest(props);
        function success() {
            chai.assert.isOk(true);
            done();
        }
        function error(xhr: Object, errorMessage: string) {
            chai.assert.isOk(false, `Status: ${xhr.status} ,Error: ${errorMessage}`);
            done(xhr);
        }
        let queryParams = {
            offset: 0,
            limit: 10,
            q: "a",
            filters: [["a", "=", "b"]],
            fields: ["id", "name"]
        };
        request.call({}, queryParams, success, error, ["1"]);
    });
});
