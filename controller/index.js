/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  yeoman = require('yeoman-generator'),
  scriptBase = require('../script-base'),
  backboneUtils = require('../util.js'),
  _str = require('underscore.string');


module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  this.argument('route', { type: String, required: false });

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = this.options.coffee ? '.coffee' : '.js';
  var destFile = path.join('app/scripts/controllers', this.name + ext);
  this.isRequireJsApp = this.isUsingRequireJS();

  if (!this.isRequireJsApp) {
    this.template('controller' + ext, destFile);
    this.addScriptToIndexGroup('controllers/' + this.name, 'controllers');

    var filepath = path.join(this.env.options.appPath, '/scripts/main.js');

    if (this.route !== undefined) {
      backboneUtils.rewriteFile({
        file: filepath,
        needle: '//m:controllers',
        splicable: [
          this.name + ': global.' + _str.camelize(this.appname) + '.Controllers.' + _str.classify(this.name) + 'Controller.create(),'
        ]
      });

      backboneUtils.rewriteFile({
        file: filepath,
        needle: '//m:routes',
        splicable: [
          '\'' + this.route + '\': \'' + this.name + '\','
        ]
      });
    }
  }

//  TODO Implement requireJS support
//  var template = [
//    '/*global define*/',
//    '',
//    'define([',
//    '    \'jquery\',',
//    '    \'backbone\'',
//    '], function ($, Backbone) {',
//    '    \'use strict\';',
//    '',
//    '    var ' + this._.classify(this.name) + 'Router = Backbone.Router.extend({',
//    '        routes: {',
//    '        }',
//    '',
//    '    });',
//    '',
//    '    return ' + this._.classify(this.name) + 'Router;',
//    '});'
//  ].join('\n');
//
//  this.write(destFile, template);
};
