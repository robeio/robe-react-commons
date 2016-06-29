import Application from "application/Application";

import chai from "chai";

const assert = chai.assert;

describe("Application.js", () => {
    it("constructors", () => {
        let app = Application;
        app.getProps().set("key", "value");
        assert.equal(app.getProps().get("key"), "value");
    });

    it("setBaseUrlPath", () => {
        let app = Application;
        try {
            app.setBaseUrlPath("value");
            assert.isOk(false);
        } catch (e) {
            assert.isOk(true);
        }
        app.setBaseUrlPath("http://www.robe.io");
        assert.equal(app.getBaseUrlPath(), "http://www.robe.io");
    });

    it("getUrl", () => {
        let app = Application;
        assert.equal(app.getUrl("admin"), "http://www.robe.io/admin");
        assert.equal(app.getUrl("/admin"), "http://www.robe.io/admin");
        assert.equal(app.getUrl("http://www.abc.com"), "http://www.abc.com");
    });
});
