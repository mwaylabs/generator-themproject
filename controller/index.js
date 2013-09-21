/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  // XXX default and banner to be implemented
  this.argument('attributes', {
    type: Array,
    defaults: [],
    banner: 'field[:type] field[:type]'
  });

  // parse back the attributes provided, build an array of attr
  this.attrs = this.attributes.map(function (attr) {
    var parts = attr.split(':');
    return {
      name: parts[0],
      type: parts[1] || 'string'
    };
  });

}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = this.options.coffee ? '.coffee' : '.js';
  var destFile = path.join('app/scripts/controllers', this.name + ext);
  this.isRequireJsApp = this.isUsingRequireJS();

  if (!this.isRequireJsApp) {
    this.template('controller' + ext, destFile);
    this.addScriptToIndex('controllers/' + this.name);
    return;
  }

  var template = [
    '/*global define*/',
    '',
    'define([',
    '    \'underscore\',',
    '    \'backbone\',',
    '    \'themproject\'',
    '], function (_, Backbone, M) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'Controller = M.Controller.extend({',
    '        defaults: {',
    '        }',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'Controller;',
    '});'
  ].join('\n');

  this.write(destFile, template);
};
