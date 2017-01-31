import Application from "application/Application";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies,import/extensions,import/no-unresolved

const assert = chai.assert;

describe("Application.js", () => {
    it("getProps", () => {
        let app = Application;
        app.getProps().set("key", "value");
        assert.equal(app.getProps().get("key"), "value");
    });

    it("setBaseUrlPath", () => {
        let app = Application;

        assert.throws(() => {
            app.setBaseUrlPath("value");
        }, "Given url is not valid ! URL :value", "Must throw exception for invalid url");
        assert.doesNotThrow(() => {
            app.setBaseUrlPath("http://www.robe.io");
        });
    });

    it("getBaseUrlPath", () => {
        let app = Application;
        app.setBaseUrlPath("http://www.robe.io");
        assert.equal(app.getBaseUrlPath(), "http://www.robe.io");
    });

    it("getUrl", () => {
        let app = Application;
        assert.equal(app.getUrl("admin"), "http://www.robe.io/admin", "Must add the given path to the end of the url");
        assert.equal(app.getUrl("/admin"), "http://www.robe.io/admin", "Must add the given path to the end of the url and normalize '/' ");
        assert.equal(app.getUrl("http://www.abc.com"), "http://www.abc.com", "Must give back the same value if url is given.");
    });

    it("loadI18n", () => {
        let app = Application;
        app.loadI18n({ meaningOfLife: "42" });
        assert.equal(app.i18n(undefined, "meaningOfLife"), "42", "Can't get a message from loaded message map");
        assert.equal(app.i18n(undefined, "http", 100), "Continue", "HTTP messages has not been merged properly into i18n");
    });
    it("loadI18n - defaultProps", () => {
        class Sample {
            static defaultProps = {
                meaningOfLife: Application.i18n(Sample, "meaningOfLife"),
                cascading: {
                    value: Application.i18n(Sample, "cascading", "value"),
                    value2: {
                        value2: Application.i18n(Sample, "cascading", "value2", "value2"),
                        value3: Application.i18n(Sample, "cascading", "value2", "value3")
                    }
                }
            }
        }
        Application.loadI18n({
            meaningOfLife: "42",
            nullMessage: undefined,
            cascading: {
                value: "cascading",
                value2: {
                    value2: "value2"
                }
            }
        });
        assert.equal(Application.i18n(Sample, "meaningOfLife"), "42", "Can't get a message from loaded message map");
        assert.equal(Application.i18n(Sample, "meaningOfLife2"), "ERROR:meaningOfLife2", "Can't load correct error message");
        assert.equal(Application.i18n(Sample, "cascading", "value"), "cascading", "Can't load cascading messages");
        assert.equal(Application.i18n(Sample, "cascading", "value2", "value2"), "value2", "Can't load cascading messages");
        assert.equal(Application.i18n(Sample, "cascading", "value2", "value3"), "ERROR:cascading:value2:value3", "Can't load cascading messages");
    });
});
