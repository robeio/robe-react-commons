import chai from "chai";
import Strings from "utils/Strings";

describe("utils/Strings.js", () => {
    it("startsWith", () => {
        let subjectString = "Merhaba";
        let searchString = "Me";
        chai.assert.isOk(Strings.startsWith(subjectString, searchString));
        searchString = "er";
        chai.assert.isNotOk(Strings.startsWith(subjectString, searchString));
        chai.assert.isOk(Strings.startsWith(subjectString, searchString, 1));
    });

    it("endsWith", () => {
        let subjectString = "Merhaba";
        let searchString = "ba";
        chai.assert.isOk(Strings.endsWith(subjectString, searchString));
        searchString = "ab";
        chai.assert.isNotOk(Strings.endsWith(subjectString, searchString));
        chai.assert.isOk(Strings.endsWith(subjectString, searchString, 6));
    });
});
