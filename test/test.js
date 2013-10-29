/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


// XXX With current API, (prior v2), that's a complete mess to setup generators
// if they differ from the standard lib/generators layout.
//
// Even for workarounds, the API is awful and doesn't let you do anything.
//
// With the new API, it will be much easier to manually register one or a set
// of generators, and manage multiple environments.
//
// Something like:
//
//    generators()
//      .register(require('../app'), 'tmp2:app')
//      .register(require('../view'), 'tmp2:view')
//      .register(require('../router'), 'tmp2:router')
//      .register(require('../model'), 'tmp2:model')
//      .register(require('../collection'), 'tmp2:collection')
//      .register(require('../controller'), 'tmp2:controller')
//      .register(require('../i18n'), 'tmp2:i18n')
//
// Or for the lazy guy:
//
//    generators()
//      .lookup('*:*', path.join(__dirname, '..'))
//

describe('The-M-Project generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.themproject = {};
      this.themproject.app = helpers.createGenerator('tmp2:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.themproject.app.options['skip-install'] = true;

      helpers.mockPrompt(this.themproject.app, {
        //features: ['compassBootstrap'],
        sass: true,
        includeRequireJS: false
      });

      done();
    }.bind(this));

  });

  it('every generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
    this.collection = require('../collection');
    this.model = require('../model');
    this.router = require('../router');
    this.view = require('../view');
    this.controller = require('../controller');
  });

  it('creates expected files', function (done) {
    var expected = [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'grunt.config.js',
      'app/favicon.ico',
      'app/index.html',
      '.gitignore',
      '.gitattributes',
      '.bowerrc',
      '.jshintrc',
      '.editorconfig',
      'Gruntfile.js',
      'package.json',
      'app/scripts/main.js',
      'app/styles/main.scss'
    ];

    this.themproject.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  describe('The-M-Project Model', function () {
    it('creates themproject model', function (done) {
      var model = helpers.createGenerator('tmp2:model', ['../../model'], ['foo']);

      this.themproject.app.run({}, function () {
        model.run([], function () {
          helpers.assertFiles([
            ['app/scripts/models/foo.js',
              /Models.FooModel = M.Model.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project Collection', function () {
    it('creates themproject collection', function (done) {
      var collection = helpers.createGenerator('tmp2:collection', ['../../collection'], ['foo']);

      this.themproject.app.run({}, function () {
        collection.run([], function () {
          helpers.assertFiles([
            ['app/scripts/collections/foo.js', /Collections.FooCollection = M.Collection.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project Router', function () {
    it('creates themproject router', function (done) {
      var router = helpers.createGenerator('tmp2:router', ['../../router'], ['foo']);

      this.themproject.app.run({}, function () {
        router.run([], function () {
          helpers.assertFiles([
            ['app/scripts/routes/foo.js', /Routers.FooRouter = M.Router.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project View', function () {
    it('creates themproject view', function (done) {
      var view = helpers.createGenerator('tmp2:view', ['../../view'], ['foo']);

      this.themproject.app.run({}, function () {
        view.run([], function () {
          helpers.assertFiles([
            ['app/scripts/views/foo.js', /Views.FooView = M.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.ejs/],
            'app/scripts/templates/foo.ejs'
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project Controller', function () {
    it('creates themproject controller', function (done) {
      var controller = helpers.createGenerator('tmp2:controller', ['../../controller'], ['foo']);

      this.themproject.app.run({}, function () {
        controller.run([], function () {
          helpers.assertFiles([
            ['app/scripts/controllers/foo.js', /Controllers.FooController = M.Controller.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project I18N', function () {
    it('creates themproject i18n', function (done) {
      var controller = helpers.createGenerator('tmp2:i18n', ['../../i18n'], ['foo']);

      this.themproject.app.run({}, function () {
        controller.run([], function () {
          helpers.assertFiles([
            ['app/scripts/i18n/foo.json', /{\n    "global.button.save": "Save document/]
          ]);
        });
        done();
      });
    });
  });
});
