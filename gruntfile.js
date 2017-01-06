const loadGruntTasks = require("load-grunt-tasks");
module.exports = (grunt) => {
    loadGruntTasks(grunt);
    grunt.initConfig({
        eslint: {
            options: {
                config: "eslint.json",
                reset: true
            },
            target: [
                "__test__/**/*.{js,jsx}",
                "src/**/*.{js,jsx}"
            ]
        }
    });
    grunt.registerTask("lint", ["eslint"]);

};
