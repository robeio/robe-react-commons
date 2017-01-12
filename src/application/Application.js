import Assertions from "../utils/Assertions";
import Maps from "../utils/Maps";
import Properties from "./Properties";
import Messages from "./Messages";
/**
 * An entry point class for all applications which supports
 * * Properties for holding custom name value pairs as long as Application object lives. {@link Properties}
 * * i18n message support {@link Messages}
 * * URL utils
 * It is singleton and accessible from everywhere.
 * @class Application
 */
class Application {

    /**
     * Key for base url property
     */
    __baseUrlPathKey = "BASE_URL_PROPERTY";

    /**
     * Creates an instance of Application with loading default messages.
     *
     */
    constructor() {
        this.props = new Properties();
        this.messages = {};
        this.loadI18n(Messages);
    }
    /**
     * Returns properties instance of the application.
     * @return {Properties} properties.
     */
    getProps = (): Properties => {
        return this.props;
    }

    /**
     * Sets base url path to the application properties.
     * @param {string} url.
     */
    setBaseUrlPath = (url: string) => {
        Assertions.isUrl(url, true);
        url = url.trim();
        this.props.set(this.__baseUrlPathKey, url);
    }

    /**
     * Returns base url from the application properties.
     * @return {string} url
     */
    getBaseUrlPath = (): string => {
        return this.getProps().get(this.__baseUrlPathKey);
    }

    /**
     * Concats the given path with the base url. Handles all slash characters.
     * @param {string} url to concat.
     * @return {string} final url. Returns the given input if it's already a url.
     */
    getUrl = (url: string): string => {
        Assertions.isNotEmpty(url, true);
        if (
            !Assertions.isUrl(url) &&
            Assertions.isNotEmpty(this.getBaseUrlPath()) &&
            Assertions.isNotUndefined(this.getBaseUrlPath())) {
            if (url.indexOf("/") !== 0) {
                url = `/${url}`;
            }
            return this.getBaseUrlPath() + url;
        }
        return url;
    }

    /**
     * Loads message map. Merges with the default messages.
     *
     * @param messagesMap
     */
    loadI18n = (messagesMap: Map) => {
        Maps.forEach(messagesMap, (value: any, code: string) => {
            // TODO: merge
            this.setI18n(code, value);
        });
    }
    /**
     * Sets a message with the spesific key given.
     * @param {string} code language key
     * @param {string} value language value
     */
    setI18n = (code: string, value: string) => {
        this.messages[code] = value;
    }
    /**
     * Returns the message with the given code
     * @param {string} code
     * @returns {any}
     */
    i18n = (...codes: Array): any => {
        let data = this.messages;
        for (let i = 0; i < codes.length - 1; i++) {
            let code = codes[i];
            if (data[code]) {
                data = data[code];
            }
        }
        data = data[codes[codes.length - 1]];
        if (data) {
            return data;
        }
        let codesj = codes.join();
        console.error(`Can't load i18n data for ${codesj}`);
        return `ERROR: ${codesj}`;
    }
}

export default new Application();
