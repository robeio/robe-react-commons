import Properties from "./Properties";
import Assertions from "../utils/Assertions";
/**
 * A singleton class which hold all application general informations.
 * @class Application
 */
class Application {

    /**
     * key for base url property
     */
    _baseUrlPathKey = "BASE_URL_PROPERTY";

    /**
     * Creates an instance of Application.
     *
     */
    constructor() {
        this.props = new Properties();
    }
    /**
     * Returns properties instance of the application.
     * @return {Properties} properties of application.
     */
    getProps = (): Properties => {
        return this.props;
    }

    /**
     * Sets base url path to the application properties.
     * @param {string} url to set.
     */
    setBaseUrlPath = (value: string) => {
        Assertions.isUrl(value, true);
        value = value.trim();
        this.props.set(this._baseUrlPathKey, value);
    }

    /**
     * Returns base url from the application properties.
     * @return {string} base url
     */
    getBaseUrlPath = (): string => {
        return this.getProps().get(this._baseUrlPathKey);
    }

    /**
     * Concats the given path with the base url. Handles all slash characters.
     * @param {string} url to concat.
     * @return {string} final url. Returns the given input if it is a url.
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
}

export default new Application();
