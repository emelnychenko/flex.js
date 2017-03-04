module.exports = function(grunt) {
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        // Metadata.
        meta: {
            build   : 'build/',
            source  : 'source/',
        },

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

        // Task configuration.
        concat: {
            options: {
                stripBanners: true,
                banner: "(function(window, undefined) {\n'use strict';\n",
                footer: "})(window);\n"
            },
            dist: {
                src: [
                    'source/ecma/fmod.js',
                    'source/ecma/watch.js',

                    'source/master.js',
                    'source/core/json.js',
                    'source/core/uri.js',
                    'source/core/dom.js',
                    'source/core/timeout.js',
                    'source/core/interval.js',
                    // 'source/eval.js',
                    // 'source/json.js',
                    // 'source/data.js',
                    // 'source/log.js',
                    'source/query.js',
                    'source/query/extend.js',
                    'source/query/each.js',
                    // 'source/query/attr.js',
                    'source/query/html.js',
                    'source/query/attr.js',
                    'source/query/text.js',
                    'source/query/get.js',
                    'source/query/find.js',
                    'source/query/first.js',
                    'source/query/last.js',
                    'source/query/blur.js',
                    'source/query/focus.js',
                    'source/query/submit.js',
                    'source/query/click.js',
                    'source/query/bind.js',
                    'source/query/unbind.js',
                    'source/query/value.js',
                    'source/query/clone.js',
                    'source/query/replace.js',
                    'source/query/remove.js',
                    // 'source/assert.js',
                    // 'source/app/app.js'
                    'source/vm.js',
                    'source/vm/bind.js',
                    'source/vm/model.js',
                    'source/vm/each.js',
                    'source/vm/dom.js',
                    'source/vm/data.js',
                ],
                dest: 'flex.js'
            }
        },
        uglify: {
            flex: {
                files: {
                    'flex.min.js': ['flex.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js', 'source/*.js', 'source/*/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    // Default task
    grunt.registerTask('default', ['concat', 'uglify']);

    // grunt.registerTask('watch', ['watch']);
};
