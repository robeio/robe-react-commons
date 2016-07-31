import Generator from "utils/Generator";
import chai from "chai";

describe("utils/Generator.js", () => {
    it("s4", () => {
        console.log(Generator.s4());
    });

    it("guid", () => {
        console.log(Generator.guid());
    });
});

