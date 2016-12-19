import AjaxRequest from "connections/AjaxRequest";// eslint-disable-line
import { asyncIt } from "../TestUtils";

describe("AjaxRequest.js", () => {
    it("callEmpty", () => {
        let props = {
            url: "http://localhost:3000/posts/1",
            type: "GET"
        };
        let request = new AjaxRequest(props);
        request.call();
    });
    asyncIt("callComplete", (done: Function) => {
        let props = {
            url: "http://localhost:3000/posts/1",
            type: "GET",
        };

        function success() {
            done();
        }
        function error(xhr: Object, errorMessage: string) {
            try{
                expect(false).toBeTruthy();
            } catch (e) {
                done(e);
            }
        }
        let request = new AjaxRequest(props);
        request.call(undefined, undefined, success, error);
    });

    it("callError", (done: Function) => {
        let props = {
            url: "http://wrong.web.site",
            type: "GET"

        };

        function success(xhr: Object) {
            try {
                expect(false).toBeTruthy();
            } catch (e) {
                done(e);
            }
        }
        function error() {
            done();
        }
        let request = new AjaxRequest(props);
        request.call(undefined, undefined, success, error);
    });

    asyncIt("callVariations", (done: Function) => {
        let props = {
            url: "http://localhost:3000/posts/1",
            type: "GET"
        };
        let request = new AjaxRequest(props);

        let error = (xhr: Object, errorMessage: string) => {
            try {
                expect(false).toBeTruthy();
            } catch (e) {
                done(e);
            }
        };

        request.call({}, undefined, () => {}, error);
        request.call({}, {}, () => { done(); }, error);
    });
    asyncIt("callQueryParams", (done: Function) => {
        let props = {
            url: "http://localhost:3000/posts",
            type: "GET"
        };
        let request = new AjaxRequest(props);
        function success() {
            done();
        }
        let error = (xhr: Object, errorMessage: string) => {
            try {
                expect(false).toBeTruthy();
            } catch (e) {
                done(e);
            }
        };

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
