module.exports = function (grunt) {
    grunt.initConfig({

        concat: {
            js: {
                src: ['src/angular-1.4.5/angular.js', 'src/angular-1.4.5/**/*.js','src/js/com.bendani.php.common.uiframework.js', 'src/**/*.js'],
                dest: 'src/js/concat.js'
            }
        },
        uglify: {
            js: {
                src: 'src/js/concat.js',
                dest: 'public/uiframework.min.js'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/uiframework.min.css': ['src/**/*.css']
                }
            }
        },
        clean: ['src/js/concat.js']
    });

// load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

// register at least this one task
    grunt.registerTask('default', [ 'concat', 'uglify', 'cssmin', 'clean']);


};
