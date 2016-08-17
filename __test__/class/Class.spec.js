import chai from "chai";
import Class from "class/Class";

const assert = chai.assert;

describe("Class.js", () => {
    it("All methods should be binded", () => {
        class ClassA extends Class {
            test() {
                return this.constructor.name;
            }
            testA() {
                return this.constructor.name;
            }
            testSuper() {
                return "super";
            }
        }
        let classA = new ClassA();
        assert.equal(classA.test(), "ClassA", "This refenrence must be ClassA instance");

        class ClassB extends ClassA {
            test() {
                return this.constructor.name + "New";
            }
            testB() {
                return this.constructor.name;
            }
        }

        let classB = new ClassB();

        assert.equal(classB.test(), "ClassBNew", "This refenrence must be ClassB instance and method must be overridden");
        assert.equal(classB.testA(), "ClassB", "This refenrence must be ClassB instance");
        assert.equal(classB.testB(), "ClassB", "This refenrence must be ClassB instance");
        assert.equal(classB.testSuper(), "super", "This refenrence must be ClassB instance but method inherided from ClassA");
    });
});
