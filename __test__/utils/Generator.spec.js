import Generator from "utils/Generator";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

describe("utils/Generator.js", () => {
    it("s4", () => {
        chai.assert.equal(Generator.s4().length, 4, "It must be 4 characters");
    });

    it("guid", () => {
        chai.assert.equal(Generator.guid().length, 36, "It must be 36 characters");
    });
});

