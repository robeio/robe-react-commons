import Assertions from "./Assertions";
/**
 * A singleton class which implements mostly used string operations.
 *
 * @class Strings
 */
class Strings {
    /**
     * The startsWith() method determines whether a string begins with the characters of another string, returning true or false as appropriate.
     * @param src
     * @param dest
     * @returns {boolean}
     */
    static startsWith(value: string, searchString: string, position: number): boolean {
        position = position || 0;
        return value.substr(position, searchString.length) === searchString;
    }

    /**
     * The endsWith() method determines whether a string ends with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @returns {boolean}
     */
    static endsWith(value: string, searchString: string, position: number): boolean {
        if (!value || !searchString || value.length < searchString.length) {
            return false;
        }
        position = position || value.length;
        return value.substring(position - searchString.length, position) === searchString;
    }

    /**
     * Converts the given arguments as string aray but difference is check arguments if arguments has one parameter and the parameter is an array then return it as string array.
     * @param {Array<string>} args
     * @return {Array<string>}
     */
    static stringsToArray(args: Array<string>): Array<string> {
        if (!args) return [];
        if (args.length === 0) return args;
        if (args.length === 1 && Assertions.isArray(args[0])) {
            return args[0];
        }
        return args;
    }
}

export default Strings;
