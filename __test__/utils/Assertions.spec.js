import Assertions from "utils/Assertions";
import chai from "chai";

/** @test {Validations} */

describe("utils/Assertions", () => {
    it("isUrl(url: string)", () => {
        let url = "https://github.com/robeio/robe";
        let expected = true;
        chai.assert.equal(Assertions.isUrl(url), expected);

        url = "github/robeio/robe";
        expected = false;
        chai.assert.equal(Assertions.isUrl(url), expected);
    });
});
