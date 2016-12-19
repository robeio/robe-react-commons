import ReactTestUtils from "react-addons-test-utils";// eslint-disable-line import/no-extraneous-dependencies

const promise = (callback: Function) => {
    return new Promise((resolve: Function, reject: Function) => {
        callback(resolve, reject);
    });
};

const asyncIt = (name: string, callback) => {
    it(name, async () => {
        let prom = new Promise((resolve: Function, reject: Function) => {
            callback((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        await prom.then(() => {
            console.log(`${name} done.`);
        }).catch((e) => {
            throw e;
        });
    });
};

const renderIntoDocument = (...args) => {
    return ReactTestUtils.renderIntoDocument.apply(undefined, args);
}

const renderClassIntoDocument = (props: Object, ClassComponent: Object, defaultProps) => {
    return this.renderIntoDocument(this.createComponent(props, ClassComponent, defaultProps));
};

const findRenderedDOMComponentWithTag = (...args) => {
    return ReactTestUtils.findRenderedDOMComponentWithTag.apply(undefined, args);
};

export {
    asyncIt,
    promise,
    renderIntoDocument,
    renderClassIntoDocument,
    findRenderedDOMComponentWithTag
};
export default {
    asyncIt,
    promise,
    renderIntoDocument,
    renderClassIntoDocument,
    findRenderedDOMComponentWithTag
};
