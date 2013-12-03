/*global describe:true, beforeEach:true, it:true */
'use strict';
var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('assert');

describe('The-M-Project scaffolding test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.themproject = {};
      this.themproject.app = helpers.createGenerator('m:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.themproject.app.options['skip-install'] = true;

      helpers.mockPrompt(this.themproject.app, {
        //features: ['compassBootstrap'],
        scaffoldingTemplate: 1,
        compass: true,
        includeRequireJS: false
      });

      done();
    }.bind(this));

  });

  it('creates expected files', function (done) {
    var expected = [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'grunt.config.js',
      'app/icons/favicon.png',
      'app/icons/android-l.png',
      'app/icons/android-m.png',
      'app/icons/android-s.png',
      'app/icons/apple-ipad-retina.png',
      'app/icons/apple-ipad.png',
      'app/icons/apple-iphone.png',
      'app/icons/apple-iphone-retina.png',
      'app/splash/apple-splash-iphone.png',
      'app/splash/apple-splash-iphone-retina.png',
      'app/splash/apple-splash-ipad-portrait.png',
      'app/splash/apple-splash-ipad-landscape.png',
      'app/splash/apple-splash-ipad-portrait-retina.png',
      'app/splash/apple-splash-ipad-landscape-retina.png',
      ['app/index.html', /scripts\/views\/absinthe.js/],
      '.gitignore',
      '.gitattributes',
      '.bowerrc',
      '.jshintrc',
      '.editorconfig',
      'Gruntfile.js',
      'package.json',
      ['app/scripts/config.js', /\/\/m:i18n/],
      'app/scripts/main.js',
      'app/styles/main.scss',
      'app/i18n/en.json',
      'app/scripts/controllers/absinthe.js',
      'app/scripts/controllers/beer.js',
      'app/scripts/views/absinthe.js',
      'app/scripts/views/beer.js',
      ['app/index.html', /<!-- m:models -->/],
      ['app/index.html', /<!-- m:collections -->/],
      ['app/index.html', /<!-- m:views -->/],
      ['app/index.html', /<!-- m:layouts -->/],
      ['app/index.html', /<!-- m:controllers -->/],
      ['app/index.html', /<!-- m:routes -->/]
    ];

    this.themproject.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });
});
