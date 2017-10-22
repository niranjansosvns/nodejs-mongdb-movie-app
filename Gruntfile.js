var config = require('./config')();

module.exports = function(grunt) {

    var envConfig = config.get(process.env.NODE_ENV);

    // project configuration
    grunt.initConfig({

        exec: {
            mongo: {
                cmd: 'mongod --port ' + envConfig.db.port
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            files: [
                './*.js',
                './controllers/*.js',
                './db/*.js', 
                './repositories/*.js',
                './models/*.js',
                './routes/*.js',
                './schemas/*.js',
                './test/**/*.spec.js']
        },

        mochaTest: {
            files: ['./test/**/*.spec.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('build', ['jshint']);
    grunt.registerTask('mongo', ['exec:mongo']);
    grunt.registerTask('test', ['mochaTest']);
};