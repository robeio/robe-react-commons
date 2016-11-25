import Class from "class/Class";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

const assert = chai.assert;

describe("Class.js", () => {
    it("All methods should be binded", () => {
        /* eslint class-methods-use-this: ["error", { "exceptMethods": ["testSuper"] }] */

        class ClassA extends Class {
            test(): string {
                return this.constructor.name;
            }
            testA(): string {
                return this.constructor.name;
            }
            testSuper(): string {
                return "super";
            }
        }
        let classA = new ClassA();
        assert.equal(classA.test(), "ClassA", "This refenrence must be ClassA instance");

        class ClassB extends ClassA {
            test(): string {
                return `${this.constructor.name}New`;
            }
            testB(): string {
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
