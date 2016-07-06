import Application from "../application/Application";
import Assertions from "../utils/Assertions";
/**
 * A singleton class which implements mostly used cookie operations.
 */
class ErrorUtility {
      // (jqXHR, exception, errorThrown, callback)
    parseHttpError = (jqXHR: any, exception: any): Map => {
        let response;
        /**
         * {
         *  code: number,
         *  message: string
         * }
         */

        let responseJSON = jqXHR.responseJSON;

        if (!responseJSON && Assertions.isJson(jqXHR.responseText)) {
            responseJSON = JSON.parse(jqXHR.responseText);
        }

        if (responseJSON && responseJSON.code) {
            response = responseJSON;
            if (!response.message) {
                response.message = Application.getError(response.code);
            }
            return response;
        }
        // response is not json then
        response = {};

        /* eslint-disable eqeqeq */
        if (Assertions.isInteger(jqXHR.status) && jqXHR.status != 0) {
            response.code = jqXHR.status;
            if (!exception || exception.trim() === "" || exception === "error") {
                response.message = Application.getError(response.code);
            }
        } else {
            if (jqXHR.url === undefined) {
                response.code = 508;
                response.message = Application.getError(response.code);
            } else if (exception === "parsererror") {
                response.code = 520;
                response.message = Application.getError(response.code);
            } else if (exception === "timeout") {
                response.code = 521;
                response.message = Application.getError(response.code);
            } else if (exception === "abort") {
                response.code = 523;
                response.message = Application.getError(response.code);
            } else {
                response.code = 551;
                response.message = Application.getError(response.code);
            }
        }
        return response;
    };
}

export default new ErrorUtility();
