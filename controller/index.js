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

  var testOptions = {
    as: 'layout',
    args: [this.name],
    options: {
      coffee: this.config.get('coffee'),
      ui: this.config.get('ui')
    }
  };

  if (this.geneateTests()){
    this.hookFor('backbone-mocha', testOptions);
  }
}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.writeTemplate('controller', path.join(this.env.options.appPath + '/scripts/controllers', this.name));

  if (!this.options.requirejs) {
    this.addScriptToIndex('controllers/' + this.name);
  }
};
