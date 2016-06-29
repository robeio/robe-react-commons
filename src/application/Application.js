import Properties from "./Properties";
import Assertions from "../utils/Assertions";
/**
 * A singleton class which hold all application general informations.
 */
class Application {

    _baseUrlPathKey = "BASE_URL_PROPERTY";

    constructor(props) {
        this.props = (props !== null && props !== undefined) ? props : new Properties();
    }

    getProps = (): Properties => {
        return this.props;
    }

    setBaseUrlPath = (value): boolean => {
        Assertions.isUrl(value, true);
        value = value.trim();
        this.props.set(this._baseUrlPathKey, value);
    }

    getBaseUrlPath = () : any => {
        return this.getProps().get(this._baseUrlPathKey);
    }

    getUrl = (url: string): string => {
        Assertions.isNotEmpty(url, true);
        if (!Assertions.isUrl(url) && Assertions.isNotEmpty(this.getBaseUrlPath())){
            if (!url.startsWith("/")) {
                url = `/${url}`;
            }
            return this.getBaseUrlPath() + url;
        }
        return url;
    }
}

export default new Application();
