const path = require("path");

/**
 *
 * @type {{root: (string|*), node_modules: (string|*)}}
 */
const paths = {
    root: path.join(__dirname, "/src"), // application base path
    node_modules: path.join(__dirname, "/node_modules") // modules path
};

/**
 * application path
 * @type {string|*}
 */
paths.app = path.join(paths.root, "/app"); // app path in base path

/**
 * application lib path
 * @type {string|*}
 */
paths.lib = path.join(paths.root, "/lib"); // library path in base path

/**
 * assets path
 * @type {string|*}
 */
paths.assets = path.join(paths.root, "/assets"); // assets path in base path

/**
 * build path
 * @type {string|*}
 */
paths.build = path.join(__dirname, "/build"); // build path in base path

module.exports = {
    paths: paths, // reference path variable
    /**
     * @link https://webpack.github.io/docs/configuration.html#context
     * The base path directory for resolving the entry option if output.pathinfo is set the include shortened to this directory.
     */
    context: paths.app,
    /* add resolve.extensions */
    /**
     *
     * @link https://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        /**
         * @link https://webpack.github.io/docs/configuration.html#resolve-root
         * The directory (absolute path) that contains your modules.
         * May also be an array of directories. This setting should be used to add individual directories to the search path.
         * It must be an absolute path! Don’t pass something like ./app/modules.
         */
        root: [paths.root],
        /**
         * @link https://webpack.github.io/docs/configuration.html#resolve-extensions
         * An array of extensions that should be used to resolve modules.
         * For example, in order to discover react jsx files, your array should contain the string ".jsx".
         */
        extensions: ["", ".jsx", ".js", ".json"],
        /**
         * @link https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
         * An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules.
         * This functions similarly to how node finds “node_modules” directories.
         * For example, if the value is ["mydir"], webpack will look in “./mydir”, “../mydir”, “../../mydir”, etc.
         */
        modulesDirectories: [paths.node_modules]
    },
    /**
     * @link https://webpack.github.io/docs/configuration.html#module
     */
    module: {
        /**
         * @link https://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
         */
        preLoaders: [
        ],
        /**
         * https://webpack.github.io/docs/configuration.html#loaders
         */
        loaders: [
            {
                /**
                 * @link https://github.com/gaearon/react-hot-loader
                 * npm install react-hot-loader --save-dev
                 */
                test: /\.js?$|\.jsx?$/,
                loaders: ["react-hot"],
                exclude: /(node_modules|bower_components|fonts)/,
                include: [paths.app, paths.lib]
            },
            {
                /**
                 * @link https://github.com/babel/babel-loader
                 * npm install babel-loader --save-dev
                 */
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components|fonts)/,
                loader: "babel-loader"
            },
            {
                /**
                 * @link https://github.com/webpack/json-loader
                 * npm install json-loader --save-dev
                 */
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                /**
                 * @link https://github.com/webpack/style-loader
                 * npm install style-loader --save-dev
                 */
                test: /\.s?css$/,
                loader: "style-loader!css-loader"
            },
            {
                /**
                 * @link https://github.com/webpack/file-loader
                 * npm install file-loader --save-dev
                 */
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: "file-loader",
                include: /fonts/
            }
        ]
    },
    /**
     * @link https://webpack.github.io/docs/configuration.html#plugins
     * will added by environment mode.
     */
    plugins: []
};

