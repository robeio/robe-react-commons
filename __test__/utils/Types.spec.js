import Types from "utils/Types";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

describe("utils/Types.js", () => {
    it("getTypeName", () => {
        let result = Types.getTypeName("example");
        chai.assert.equal("String", result);
    });
    it("getCloneFunction", () => {
        let object = "Example";
        let cloneFunction = Types.getCloneFunction("example");
        let result = cloneFunction(object);
        chai.assert.equal(object, result);
    });
    it("getType", () => {
        let object = "Example";
        let type = Types.getType(object);
        console.log(type);
        chai.assert.equal(String, type);
    });
});
