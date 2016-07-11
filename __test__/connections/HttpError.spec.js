import HttpError from "connections/HttpError";
import chai from "chai";
import Messages from "application/Messages";
/* eslint-disable no-unused-vars */
import Application from "application/Application";
/* eslint-disable quote-props */
describe("AjaxRequest.js", () => {
    // parse = (jqXHR: any, exception: any): Map => {
    it("parse().responseJSON", () => {
        let errorCode = 403;
        let errorMessage = "Custom Error Message";
        let errorXHR = {
            "url": "http://localhost:8080/example",
            responseJSON: {
                "code": errorCode,
                "message": errorMessage
            }
        };

        let expectedError = {
            code: errorCode,
            message: errorMessage
        };

        chai.assert.deepEqual(HttpError.parse(errorXHR), expectedError);

        delete errorXHR.responseJSON["message"];

        expectedError.message = Messages.error[errorCode];

        chai.assert.deepEqual(HttpError.parse(errorXHR), expectedError);
    });
    it("parse().responseText", () => {
        let errorCode = 403;
        let errorMessage = "Custom Error Message";
        let errorXHR = {
            "url": "http://localhost:8080/example",
            responseText: `{ "code": ${errorCode}, "message": "${errorMessage}" }`
        };

        let expectedError = {
            code: errorCode,
            message: errorMessage
        };

        chai.assert.deepEqual(HttpError.parse(errorXHR), expectedError);

        expectedError.message = Messages.error[errorCode];

        errorXHR = {
            "url": "http://localhost:8080/example",
            responseText: `{ "code": ${errorCode} }`
        };

        chai.assert.deepEqual(HttpError.parse(errorXHR), expectedError);
    });

    it("parse().status", () => {
        let errorCode = 403;
        let errorMessage = "Custom Error Message";
        let errorXHR = {
            "url": "http://localhost:8080/example",
            status: errorCode
        };

        let expectedError = {
            code: errorCode,
            message: errorMessage
        };

        chai.assert.deepEqual(HttpError.parse(errorXHR, errorMessage), expectedError);

        expectedError.message = Messages.error[errorCode];

        chai.assert.deepEqual(HttpError.parse(errorXHR), expectedError);
        chai.assert.deepEqual(HttpError.parse(errorXHR, "  "), expectedError);
        chai.assert.deepEqual(HttpError.parse(errorXHR, "error"), expectedError);
    });

    it("parse().508", () => {
        let errorCode = 508;

        let errorXHR = {

        };

        let expectedError = {
            code: errorCode,
            message: Messages.error[errorCode]
        };
        chai.assert.deepEqual(HttpError.parse(errorXHR), expectedError);
    });
    it("parse().520", () => {
        let errorCode = 520;

        let errorXHR = {
            url: "http:/localhost:8080/example"
        };

        let expectedError = {
            code: errorCode,
            message: Messages.error[errorCode]
        };
        chai.assert.deepEqual(HttpError.parse(errorXHR, "parsererror"), expectedError);
    });
    it("parse().521", () => {
        let errorCode = 521;

        let errorXHR = {
            url: "http:/localhost:8080/example"
        };

        let expectedError = {
            code: errorCode,
            message: Messages.error[errorCode]
        };
        chai.assert.deepEqual(HttpError.parse(errorXHR, "timeout"), expectedError);
    });
    it("parse().523", () => {
        let errorCode = 523;

        let errorXHR = {
            url: "http:/localhost:8080/example"
        };

        let expectedError = {
            code: errorCode,
            message: Messages.error[errorCode]
        };
        chai.assert.deepEqual(HttpError.parse(errorXHR, "abort"), expectedError);
    });
    it("parse().551", () => {
        let errorCode = 551;

        let errorXHR = {
            url: "http:/localhost:8080/example"
        };

        let expectedError = {
            code: errorCode,
            message: Messages.error[errorCode]
        };
        chai.assert.deepEqual(HttpError.parse(errorXHR, "unknown"), expectedError);
    });
});
