import AjaxRequest from "connections/AjaxRequest";
import chai from "chai";

describe("AjaxRequest.js", () => {
    it("call", () => {
        let props = {
            url: "http://jsonplaceholder.typicode.com/posts/1",
            async: false
        };
        let request = new AjaxRequest(props);

        request.call({ id: "1", name: "123" });
        chai.assert.isOk(true);
    });
});
