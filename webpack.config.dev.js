/**
 * import common webpack settings
 */
const commonSettings = require("./webpack.config.common.js");

/**
 * @link https://webpack.github.io/docs/configuration.html#cache
 * Cache generated modules and chunks to improve performance for multiple incremental builds.
 This is enabled by default in watch mode.
 * @type {boolean}
 */
commonSettings.cache = true;

/**
 * @link https://webpack.github.io/docs/configuration.html#debug
 * Switch loaders to debug mode.
 * @type {boolean}
 */
commonSettings.debug = true;

/**
 * @link https://webpack.github.io/docs/configuration.html#devtool
 * Choose a developer tool to enhance debugging.
 * source-map - A SourceMap is emitted. See also output.sourceMapFilename.
 * @type {string}
 */
commonSettings.devtool = "source-map";


/**
 * @link https://github.com/MoOx/eslint-loader
 * added eslint-loader plugin for check the syntax of code by rules
 */

commonSettings.module.loaders.push({
    test: /(\.jsx|\.js)$/,
    loader: "eslint-loader",
    exclude: /node_modules/
});

/**
 *
 * @type {{root: *[]}}
 */
commonSettings.entry = {
    "robe-react-common": "../src/index.js"
};

commonSettings.output = {
    path: commonSettings.paths.dist,
    filename: "[name].js",
    library: "RobeReactCommon",
    libraryTarget: "umd",
    umdNamedDefine: true
};

module.exports = commonSettings;
