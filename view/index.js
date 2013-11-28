/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  yeoman = require('yeoman-generator'),
  scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

}

util.inherits(Generator, scriptBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  var ext = this.options.coffee ? '.coffee' : '.js';

  var destFile = path.join('app/scripts/views', this.name + ext);
  var isRequireJsApp = this.isUsingRequireJS();

  if (!isRequireJsApp) {
    this.template('view' + ext, destFile);
    this.addScriptToIndexGroup('views/' + this.name, 'views');
    return;
  }

//  TODO Implement requireJS support
//  var template = [
//    '/*global define*/',
//    '',
//    'define([',
//    '    \'jquery\',',
//    '    \'underscore\',',
//    '    \'backbone\',',
//    '    \'templates\'',
//    '], function ($, _, Backbone, JST) {',
//    '    \'use strict\';',
//    '',
//    '    var ' + this._.classify(this.name) + 'View = Backbone.View.extend({',
//    '        ' + 'template: JST[\'' + this.jst_path + '\']',
//    '    });',
//    '',
//    '    return ' + this._.classify(this.name) + 'View;',
//    '});'
//  ].join('\n');
//
//  this.write(destFile, template);
};
