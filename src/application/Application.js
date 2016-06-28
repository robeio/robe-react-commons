import Properties from "./Properties";
/**
 * A singleton class which hold all application general informations.
 */
class Application {

    _baseUrlPathKey = "BASE_URL_PROPERTY";

    constructor(props) {
        this.props = (props !== null && props !== undefined) ? props : new Properties();
        console.log(this.props);
    }

    getProps = (): Properties => {
        return this.props;
    }

    setBaseUrlPath = (value): boolean => {
        Assertions.isUrl(value, true);
        value = value.trim();
        if (value.endsWith("/")) {
            value = `${value}/`;
        }
        this.props.set(this._baseUrlPathKey, value);
    }

    getBaseUrlPath = () : any => {
        console.log(this.getProps());
        return this.getProps().get(this._baseUrlPathKey);
    }
}

export default new Application();
