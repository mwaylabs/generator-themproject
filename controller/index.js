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
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));
  this.argument('route', { type: String, required: false });

  var testOptions = {
    as: 'controller',
    args: [this.name],
    options: {
      coffee: this.config.get('coffee'),
      ui: this.config.get('ui')
    }
  };

  if (this.geneateTests()){
    this.hookFor('m-mocha', testOptions);
  }
}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.writeTemplate('controller', path.join(this.env.options.appPath + '/scripts/controllers', this.name));

  if (!this.options.requirejs) {
    this.addScriptToIndex('controllers/' + this.name);

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
};
