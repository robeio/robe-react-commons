import React from "react";
import Store from "stores/Store";
import StoreShallowComponent from "components/StoreShallowComponent";
import Assertions from "utils/Assertions";
import { RemoteEndPoint } from "index";
import chai from "chai";
import TestUtils from "react-addons-test-utils";


/** @test {Store} */
describe("Store.js", () => {
    const url = "http://localhost:3000/posts";
    /** @test {Store#constructor} */
    it("constructors", () => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            })
        });
        chai.assert.operator(store.getObjectId(), ">=", 0);
        chai.assert.isTrue(Assertions.isFunction(store.getProps().importer), true);
        chai.assert.equal(store.getProps().idField, "oid");
        chai.assert.equal(store.getProps().autoLoad, false);

        store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            autoLoad: true,
            idField: "id"
        });
        chai.assert.operator(store.getObjectId(), ">=", 0);
        chai.assert.isTrue(Assertions.isFunction(store.getProps().importer), true);
        chai.assert.equal(store.getProps().idField, "id");
        chai.assert.equal(store.getProps().autoLoad, true);
        chai.assert.deepEqual(store.getProps().importer({}), {});
    });
    /** @test {Store#getProps} */
    it("getProps", () => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            autoLoad: true,
            idField: "id",
            importer: (response: any): any => {
                return response;
            }
        });
        chai.assert.operator(store.getObjectId(), ">=", 0);
        chai.assert.isTrue(Assertions.isFunction(store.getProps().importer), true);
        chai.assert.equal(store.getProps().idField, "id");
        chai.assert.equal(store.getProps().autoLoad, true);
    });
    /** @test {Store#getObjectId} */
    it("getObjectId", () => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            })
        });
        let store2 = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            })
        });
        chai.assert.operator(store.getObjectId(), ">=", 0);
        chai.assert.operator(store2.getObjectId(), ">", store.getObjectId());
    });
    /** @test {Store#getName} */
    it("getName", () => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            })
        });
        chai.assert.equal(store.getName(), "Store");
    });

    /** @test {Store#getResult} */
    it("getResult", (done: Function) => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            autoLoad: true,
            onSuccess: (result: Map) => {
                chai.assert.isArray(result.data);
                chai.assert.isNumber(result.totalCount);
                done();
            },
            // onError: (error: Map) => {
            onError: () => {
                done();
            }
        });
        let expectedDefaultResult = {
            data: [],
            totalCount: 0
        };
        // default check code.
        chai.assert.deepEqual(store.getResult(), expectedDefaultResult);
    });

    /** @test {Store#register} */
    it("register", (done: Function) => {
        // Render a checkbox with label in the document
        class TestComponent extends StoreShallowComponent {
            constructor(props: Object) {
                super(props);
                this.state = {
                    size: props.stores[0].getResult().data.length
                };
            }
            render(): string {
                return (<div>{this.state.size}</div>);
            }
            triggerChange(store: Store) {
                this.setState({
                    size: store.getResult().data.length
                });
            }
        }

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            autoLoad: true,
            // onSuccess: (result: Map) => {
            onSuccess: () => {
                let test2 = TestUtils.renderIntoDocument(<TestComponent stores={[store]} />);

                let domNode = TestUtils.findRenderedDOMComponentWithTag(test2, "div");
                chai.assert.operator(domNode.innerText, ">", 0);
                done();
            },
            // onError: (error: Map) => {
            onError: () => {
                done();
            }
        });

        let test = TestUtils.renderIntoDocument(<TestComponent stores={[store]} />);

        let domNode = TestUtils.findRenderedDOMComponentWithTag(test, "div");
        chai.assert.equal(domNode.innerText, 0);
    });
    /** @test {Store#unRegister} */
    it("unRegister", () => {

    });
    /** @test {Store#triggerChanges} */
    it("triggerChanges", () => {

    });
    /** @test {Store#triggerChange} */
    it("triggerChange", () => {

    });
    /** @test {Store#_onSuccess} */
    it("_onSuccess", () => {

    });
    /** @test {Store#_onError} */
    it("_onError", () => {

    });
    /** @test {Store#__successCallback} */
    it("__successCallback", () => {

    });
    /** @test {Store#__errorCallBack} */
    it(" __errorCallBack", () => {

    });
    /** @test {Store#read} */
    it("read", (done: Function) => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: "page not found"
            })
        });

        store.read(() => {
            chai.assert(false, "Request should give error ! URL is not correct ! ");
        }, (error: Map) => {
            chai.assert.equal(error.code, 508);
        });

        store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            idField: "id"
        });

        store.read(
            (result: Map) => {
                chai.assert.isArray(result.data);
                chai.assert.isNumber(result.totalCount);
                done();
            },
            () => {
                chai.assert(false, "Request should be success ! ");
                done();
            });
    });
    /** @test {Store#create} */
    it("create", (done: Function) => {
        let item = { id: new Date().getTime(), title: "Post" };
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            idField: "id",
            autoLoad: true,
            onSuccess: () => {
                let count = store.getResult().data.length;
                store.create(
                    item,
                    () => {
                        chai.assert.equal(store.getResult().data.length, count + 1);
                        done();
                    },
                    // (error: Map) => {
                    () => {
                        done();
                    }
                );
            },
            //  onError: (error: Map) => {
            onError: () => {
                done();
            }
        });
    });
    /** @test {Store#update} */
    it("update", (done: Function) => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            idField: "id",
            autoLoad: true,
            onSuccess: () => {
                let count = store.getResult().data.length;
                if (count > 1) {
                    let oldItem = store.getResult().data[1];
                    let updatedItem = store.getResult().data[1];
                    updatedItem.title = "updated title";
                    store.update(
                        oldItem,
                        updatedItem,
                        () => {
                            chai.assert.equal(store.getResult().data.length, count);
                            done();
                        },
                        // (error: Map) => {
                        () => {
                            done();
                        }
                    );
                } else {
                    done();
                }
            },
            // onError: (error: Map) => {
            onError: () => {
                done();
            }
        });
    });
    /** @test {Store#delete} */
    it("delete", (done: Function) => {
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            idField: "id",
            autoLoad: true,
            onSuccess: () => {
                let count = store.getResult().data.length;
                if (count > 1) {
                    let willDeleteItem = store.getResult().data[1];
                    store.delete(
                        willDeleteItem,
                        () => {
                            chai.assert.equal(store.getResult().data.length, count - 1);
                            done();
                        },
                        // (error: Map) => {
                        () => {
                            done();
                        }
                    );
                } else {
                    done();
                }
            },
            //  onError: (error: Map) => {
            onError: () => {
                done();
            }
        });
    });
});
