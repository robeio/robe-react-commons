import RemoteEndPoint from "endpoint/RemoteEndPoint";
describe("RemoteEndPoint.js", () => {
    const url = "http://localhost:3000/posts,";
    it("constructors", () => {
        let endpoint = new RemoteEndPoint({ url: url });

    });
});
