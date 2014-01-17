/**
 * The Gruntfile for The-M-Project
 * Version: 0.2.0
 *
 * If you want to modify several settings
 * take a look at the grunt.config.js file.
 *
 * For further information how you can customize grunt go to:
 * http://gruntjs.com/getting-started
 */

'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: '<%= templateFramework %>'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // load config
    var cfg = require('./grunt.config.js');

    // configurable paths
    var yeomanConfig = {
        app: '<%= env.options.appPath %>',
        dist: 'dist'
    };

    // TODO: Implement validation handling
    var defaultOption = function( name, defaultValue ) {
        var value = grunt.option(name);
        if( value === void 0 ) {
            value = defaultValue;
        }
        return value;
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        bwr: grunt.file.readJSON('bower.json'),
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },<% if (options.coffee) { %>
            coffee: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },<% } %><% if (compassBootstrap) { %>
            compass: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },<% } %>
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%%= yeoman.app %>/*.html',
                    '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}',
                    'test/spec/**/*.js'
                ]
            }<% if (templateFramework === 'mustache') { %>,
            mustache: {
                files: [
                    '<%%= yeoman.app %>/scripts/templates/*.mustache'
                ],
                tasks: ['mustache']
            }<% } else if (templateFramework === 'handlebars') { %>,
            handlebars: {
                files: [
                    '<%%= yeoman.app %>/scripts/templates/*.hbs'
                ],
                tasks: ['handlebars']
            }<% } else { %>,
            tmpl: {
                files: [
                    '<%%= yeoman.app %>/scripts/templates/*.ejs'
                ],
                tasks: ['tmpl']
            }<% } %>,
            test: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
                tasks: ['test']
            }
        },
        connect: {
            options: {
                port: defaultOption('port', cfg.server.port),
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        var middleware = [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                        if(cfg.server.proxies) {
                            middleware.unshift(proxySnippet);
                        }
                        return middleware;
                    }
                }
            },
            manualreload: {
                options: {
                    middleware: function (connect) {
                        var middleware = [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                        if(cfg.server.proxies) {
                            middleware.unshift(proxySnippet);
                        }
                        return middleware;
                    },
                    keepalive: true
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        }<% if (testFramework === 'mocha') { %>,
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%%= connect.test.options.port %>/index.html']
                }
            }
        }<% } else { %>,
        jasmine: {
            all:{
                src : '<%= yeoman.app %>/scripts/{,*/}*.js',
                options: {
                    keepRunner: true,
                    specs : 'test/spec/**/*.js',
                    vendor : [
                        '<%%= yeoman.app %>/bower_components/jquery/jquery.js',
                        '<%%= yeoman.app %>/bower_components/underscore/underscore.js',
                        '<%%= yeoman.app %>/bower_components/backbone/backbone.js',
                        '.tmp/scripts/templates.js'
                    ]
                }
            }
        }<% } %>,<% if (options.coffee) { %>
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',<% if (options.coffee) { %>
                    src: '{,*/}*.coffee',<% } %>
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },<% } %><% if (compassBootstrap) { %>
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/styles/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },<% } %><% if (includeRequireJS) { %>
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {<% if (options.coffee) { %>
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '.tmp/scripts',<% } else { %>
                    baseUrl: '<%%= yeoman.app %>/scripts',<% } %>
                    optimize: 'none',
                    paths: {
                        'templates': '../../.tmp/scripts/templates',
                        'jquery': '../../app/bower_components/jquery/jquery',
                        'underscore': '../../app/bower_components/underscore/underscore',
                        'backbone': '../../app/bower_components/backbone/backbone'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true<% if (templateFramework !== 'handlebars') { %>,
                    wrap: true<% } %>
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },<% } else { %>
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/<% } %>
        useminPrepare: {
            html: '<%%= yeoman.app %>/index.html',
            options: {
                dest: '<%%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>/bower_components/font-awesome/',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        'fonts/{,*/}*.*'
                    ]
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.html',
                        'icons/*.png',
                        'splash/*.png',
                        'images/{,*/}*.{webp,gif}',
                        'fonts/{,*/}*.*',
                        'i18n/*.js'
                    ]
                }]
            }
        },<% if (includeRequireJS) { %>
        bower: {
            all: {
                rjsConfig: '<%%= yeoman.app %>/scripts/main.js'
            }
        },<% } %><% if (templateFramework === 'mustache') { %>
        mustache: {
            files: {
                src: '<%%= yeoman.app %>/scripts/templates/',
                dest: '.tmp/scripts/templates.js',
                options: {<% if (includeRequireJS) { %>
                    prefix: 'define(function() { this.JST = ',
                    postfix: '; return this.JST;});'<% } else { %>
                    prefix: 'this.JST = ',
                    postfix: ';'<% } %>
                }
            }
        }<% } else if (templateFramework === 'handlebars') { %>
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST'<% if (includeRequireJS) { %>,
                    amd: true<% } %>
                },
                files: {
                    '.tmp/scripts/templates.js': ['<%%= yeoman.app %>/scripts/templates/*.hbs']
                }
            }
        }<% } else { %>
        tmpl: {<% if (includeRequireJS) { %>
            options: {
                amd: true
            },<% } %>
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%%= yeoman.app %>/scripts/templates/*.ejs']
                }
            }
        }<% } %>,
        rev: {
            dist: {
                files: {
                    src: [
                        // TODO support rev for i18n and images
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%%= yeoman.dist %>/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        manifest: {
            generate: {
                options: {
                    preferOnline: true,
                    timestamp: true,
                    basePath: '<%= yeoman.dist %>',
                    master: ['<%%= yeoman.dist %>/index.html']
                },
                src: [
                    'images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    'scripts/{,*/}*.js',
                    'styles/{,*/}*.css',
                    'i18n/*.json'
                ],
                dest: '<%%= yeoman.dist %>/manifest.appcache'
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',<% if (options.coffee) { %>
                'coffee',<% } %>
                'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
                'mustache',<% } else if (templateFramework === 'handlebars') { %>
                'handlebars',<% } else { %>
                'tmpl',<% } %><% if (compassBootstrap) { %>
                'compass:server',<% } %>
                'connect:test',
                'watch:livereload'
            ]);
        }

        var reloadType = 'manualreload';
        if( defaultOption('autoReload', cfg.server.autoReload) ) {
            reloadType = 'livereload';
        }

        var tasks = [
            'clean:server',<% if (options.coffee) { %>
            'coffee:dist',<% } %>
            'createDefaultTemplate',<% if (templateFramework === 'mustache') { %>
            'mustache',<% } else if (templateFramework === 'handlebars') { %>
            'handlebars',<% } else { %>
            'tmpl',<% } %><% if (compassBootstrap) { %>
            'compass:server',<% } %>
            'configureProxies',
            'connect:' + reloadType
        ];

        if(reloadType === 'livereload') {
            tasks.push('watch:livereload');
        }

        if( defaultOption('openBrowser', cfg.server.openBrowser) ) {
            tasks.splice(tasks.length - 1, 0, 'open');
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask('amendIndexFile', '', function() {

        // Open file
        var path = grunt.template.process('<%%= yeoman.dist %>/index.html');
        var content = grunt.file.read(path);

        // Construct banner
        var banner = '<!--\n'+
        'Version: <%%= pkg.version %>\n'+
        'Date: <%%= grunt.template.today() %>\n'+
        'Build with The-M-Project <%%= bwr.dependencies.themproject %>\n'+
        '-->\n';
        content = grunt.template.process(banner) + content;

        // Add manifest attribute
        var regex = new RegExp('(<html+(?![^>]*\bmanifest\b))', 'g');
        content = content.replace(regex, '$1 manifest="manifest.appcache"');

        // Save file
        grunt.file.write(path, content);
    });

    grunt.registerTask('test', [
        'clean:server',<% if (options.coffee) { %>
        'coffee',<% } %>
        'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
        'mustache',<% } else if (templateFramework === 'handlebars') { %>
        'handlebars',<% } else { %>
        'tmpl',<% } %><% if (compassBootstrap) { %>
        'compass',<% } %><% if(testFramework === 'mocha') { %>
        'connect:test',
        'mocha',<% } else { %>
        'jasmine',<% } %>
        'watch:test'
    ]);

    grunt.registerTask('build', [
        'clean:dist',<% if (options.coffee) { %>
        'coffee',<% } %>
        'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
        'mustache',<% } else if (templateFramework === 'handlebars') { %>
        'handlebars',<% } else { %>
        'tmpl',<% } %><% if (compassBootstrap) { %>
        'compass:dist',<% } %>
        'useminPrepare',<% if (includeRequireJS) { %>
        'requirejs',<% } %>
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin',
        'manifest',
        'amendIndexFile'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
