import Strings from "utils/Strings";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

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

    it("stringsToArray", () => {
        let array1 = ["nanimo", "kavaranay"];
        let array2 = [["nanimo", "kavaranay"]];

        let array1Result = Strings.stringsToArray(array1);
        let array2Result = Strings.stringsToArray(array2);
        chai.assert.deepEqual(array1Result, array2Result);
    });
});
