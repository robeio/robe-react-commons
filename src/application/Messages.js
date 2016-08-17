
/**
 * A singleton class which hold all static messages.
 * @class messages
 */
const messages = {
     /**
     * http key is for http default messages.
     */
    http: {
        100: "Continue",
        101: "Switching Protocols",
        102: "Processing	WebDAV",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status	WebDAV",
        210: "Content Different	WebDAV",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Moved Temporarily",
        303: "See Other",
        304: "Not Modified",
        307: "Temporary Redirect",
        305: "Use Proxy",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Page Not Found",
        405: "Not allowed method",
        406: "Not Acceptable",
        407: "Unauthorized on proxy",
        408: "Request timeout",
        409: "Conflicts connections",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Long",
        415: "Unsupported Media Type",
        416: "Requested range unsatifiable",
        417: "Expectation failed",
        422: "Unprocessable entity	WebDAV :",
        423: "Locked	WebDAV :",
        424: "Method failure	WebDAV :",
        500: "Internal Server Error",
        501: "Uygulanmamış",
        502: "Invalid gateway",
        503: "Service unavaliable",
        504: "Gateway Timeout",
        505: "HTTP Version not supported",
        507: "Insufficient storage	WebDAV",
        508: "Wrong URL ",
        520: "Requested JSON parse failed.",
        521: "Time out error.",
        523: "Ajax request aborted."
    }
};

export default messages;
