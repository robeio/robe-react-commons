import Application from "application/Application";
import chai from "chai";
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
        assert.equal(app.i18n("meaningOfLife"), "42", "Can't get a message from loaded message map");
    });
});
