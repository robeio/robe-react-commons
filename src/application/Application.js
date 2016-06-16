import Properties from "utils/Properties";
/**
 * A singleton class which hold all application general informations.
 */
class Application {

    constructor() {
        this.props = new Properties();
    }

    getProps = (): Properties => {
        return this.props;
    }
    getBaseUrlPath(): string {
        return this.props.get("BASE_URL_PROPERTY");
    }
}

export default new Application();
