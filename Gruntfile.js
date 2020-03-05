module.exports = function (grunt) {

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        cssc: {
            build: {
                options: {
                    sortSelectors: true,
                    lineBreaks: true,
                    sortDeclarations: true,
                    consolidateViaDeclarations: false,
                    consolidateViaSelectors: false,
                    consolidateMediaQueries: false
                },
                files: {
                    'resources/css/fog.min.css': 'resources/css/fog.css',
                    'resources/css/components.min.css': 'resources/css/components.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'resources/css/fog.css',
                dest: 'resources/css/<%= pkg.name %>.min.css'
            }
        },

        sass: {
            build: {
                files: {
                    'resources/css/fog.css': 'resources/sass/fog.scss',
                    'resources/css/components.css': 'resources/sass/components.scss'
                    /*  not included in pgk.name.min.css  (not global enough) build these separately--not included in globals.jsp */
                   /* 'inc/css/components/highlight.css': 'inc/sass/components/highlight.scss',
                    'inc/css/components/amslides.css': 'inc/sass/components/amslides.scss'*/

                }
            }
        },

        watch: {

            js: {
                files: ['resources/js/<%= pkg.name %>.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['resources/sass/**/*.scss'],
                tasks: ['buildcss']
            },
            livereload: {
                files: ['*.html', 'resources/css/*.css', 'resources/js/*.js'],
                options: {
                    livereload: true
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'resources/js/<%= pkg.name %>.min.js': [
                        'resources/js/fog.js'


                    ]
                }
            }
        }

    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-cssc');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'uglify', 'cssc', 'cssmin', 'watch']);
    grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);

};
