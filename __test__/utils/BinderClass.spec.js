import BinderClass from "utils/BinderClass";
import chai from "chai";

describe("utils/BinderClass.js", () => {
    it("constructors", () => {
        class Example extends BinderClass {
            getThis(): Example {
                return this;
            }
        }
        let instance = new Example();

        chai.assert.deepEqual(instance, instance.getThis());
    });
});
