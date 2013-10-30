/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('locale', { type: String, required: true });

  var dirPath = '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.createI18NFiles = function createI18NFiles() {
  var destFile = path.join('app/i18n', this.locale + '.json');
  this.template('i18n.json', destFile);
};
