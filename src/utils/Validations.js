/**
 * A singleton class which implements mostly used validation operations.
 */
class Validations {

    /**
     * "^(https?:\/\/)?"+ // protocol
     * "((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|"+ // domain name
     * "((\d{1,3}\.){3}\d{1,3}))"+ // OR ip (v4) address
     * "(\:\d+)?(\/[-a-z\d%_.~+]*)*"+ // port and path
     * "(\?[;&a-z\d%_.~+=-]*)?"+ // query string
     * "(\#[-a-z\d_]*)?$","i"); // fragment locater
     *
     * check if the string is url then
     * @type {RegExp}
     */
    static URL_PATTERN = /([a-z]+:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ #]*)#?([^ #]*)/g;
    /**
     * Removes the given item from the given array.
     * @param {Array} source Source array for the remove operation. *This array will be modified at the end of the operation.*
     * @param {any} target Target to match.
     * @returns {boolean} "true": target removed , "false": target not found.
     */
    isUrl(url: String): boolean {
        return Validations.URL_PATTERN.test(url);
    }
}

export default new Validations();
