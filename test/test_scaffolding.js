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
      this.themproject.app = helpers.createGenerator('tmp2:app', [
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
      'app/icons/touch-icon-ipad.png',
      'app/icons/touch-icon-ipad-retina.png',
      'app/icons/touch-icon-iphone.png',
      'app/icons/touch-icon-iphone-retina.png',
      ['app/index.html', /scripts\/views\/absinthe.js/],
      '.gitignore',
      '.gitattributes',
      '.bowerrc',
      '.jshintrc',
      '.editorconfig',
      'Gruntfile.js',
      'package.json',
      'app/scripts/config.js',
      'app/scripts/main.js',
      'app/styles/main.scss',
      'app/i18n/en.json',
      'app/scripts/controllers/absinthe.js',
      'app/scripts/controllers/beer.js',
      'app/scripts/views/absinthe.js',
      'app/scripts/views/beer.js',
    ];

    this.themproject.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });
});
