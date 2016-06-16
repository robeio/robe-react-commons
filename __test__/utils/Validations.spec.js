import Validations from "utils/Validations";
import chai from "chai";

/** @test {Validations} */

describe("utils/Validations", () => {
    it("isUrl(url: string)", () => {
        let url = "https://github.com/robeio/robe";
        let expected = true;
        chai.assert.equal(Validations.isUrl(url), expected);

        url = "github/robeio/robe";
        expected = false;
        chai.assert.equal(Validations.isUrl(url), expected);
    });
});
