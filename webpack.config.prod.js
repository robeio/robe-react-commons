const path = require("path");
const webpack = require("webpack");

/**
 * import common webpack settings
 */
const commonSettings = require("./webpack.config.common.js");

/**
 * @link https://github.com/webpack/docs/wiki/optimization#deduplication
 * @type DedupePlugin
 */
commonSettings.plugins.push(new webpack.optimize.DedupePlugin());
/**
 * @link https://github.com/webpack/docs/wiki/optimization#deduplication
 * @type DedupePlugin
 */
commonSettings.plugins.push(new webpack.optimize.UglifyJsPlugin());
/**
 * @link https://github.com/webpack/docs/wiki/optimization#minimize
 * @type OccurenceOrderPlugin
 */
commonSettings.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
/**
 * https://github.com/webpack/docs/wiki/optimization#chunks
 * @type LimitChunkCountPlugin
 */
commonSettings.plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }));
/**
 * @link https://github.com/webpack/docs/wiki/optimization#chunks
 * @type MinChunkSizePlugin
 */
commonSettings.plugins.push(new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }));

/**
 *
 * @type {{root: *[]}}
 */
commonSettings.entry = {
    'robe-react-common': '../src/index.js'
};

commonSettings.output= {
    path: './dist',
    filename: '[name].min.js',
    library: 'RobeReactCommon',
    libraryTarget: 'umd'
};


module.exports = commonSettings;
