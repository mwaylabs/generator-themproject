'use strict';
var path = require('path');
var fs = require('fs');
var util = require('util');
var yeoman = require('yeoman-generator');
var backboneUtils = require('./util.js');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.env.options.appPath = this.config.get('appPath') || 'app';

  if (this.env.options.minsafe) {
    sourceRoot += '-min';
  }

  if (typeof this.env.options.coffee === 'undefined') {
    this.option('coffee');

    // attempt to detect if user is using CS or not
    // if cml arg provided, use that; else look for the existence of cs
    if (!this.options.coffee &&
      this.expandFiles(path.join(this.env.options.appPath, '/scripts/**/*.coffee'), {}).length > 0) {
      this.options.coffee = true;
    }

    this.env.options.coffee = this.options.coffee;
  }

  // check if --requirejs option provided or if require is setup
  if (typeof this.env.options.requirejs === 'undefined') {
    this.option('requirejs');

    this.options.requirejs = this.checkIfUsingRequireJS();

    this.env.options.requirejs = this.options.requirejs;
  }

  this.setupSourceRootAndSuffix();
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.addScriptToIndexGroup = function (script, group) {
  this.addScriptToIndex(script, '<!-- m:' + group + ' -->');
}

Generator.prototype.addScriptToIndex = function (script, needle) {
  try {
    needle = needle || '<!-- endbuild -->';
    var appPath = this.env.options.appPath;
    var fullPath = path.join(appPath, 'index.html');

    backboneUtils.rewriteFile({
      file: fullPath,
      needle: needle,
      splicable: [
        '<script src="scripts/' + script + '.js"></script>'
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
  }
};

/*
 * Check whether the App is a RequireJS app or not
 *
 * @return boolean
 */
Generator.prototype.isUsingRequireJS = function isUsingRequireJS() {
  var ext = this.env.options.coffee ? '.coffee' : '.js';
  var filepath = path.join(process.cwd(), 'app/scripts/main' + ext);

  try {
    return (/require\.config/).test(this.read(filepath));
  } catch (e) {
    return false;
  }
};

/**
 * Generate an application template.
 *
 * @param type
 */
Generator.prototype.getScaffoldingTemplates = function getScaffoldingTemplates() {

  var index = 0;
  var result = [
    {name: 'Blank', value:index++}
  ];

  var basePath = __dirname + '/templates';
  var files = fs.readdirSync(basePath);
  files.forEach(function (file) {
    var filePath = basePath + '/' + file;
    var stats = fs.lstatSync(filePath);
    if (stats.isDirectory() && fs.existsSync(filePath + '/package.json')) {

      // Read file which contains the setup instructions
      var pkg = this.read(filePath + '/package.json', 'utf8');
      pkg = JSON.parse(pkg);
      pkg.path = file;
      pkg.value = index++;
      result.push(pkg);
    }
  }.bind(this));

  return result;
}