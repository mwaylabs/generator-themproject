/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var backboneUtils = require('../util.js');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('locale', { type: String, required: true });

  var dirPath = '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.createI18NFiles = function createI18NFiles() {
  var destFile = path.join('app/i18n', this.locale + '.js');
  var cfgFile = 'app/scripts/config.js';
  this.template('i18n.js', destFile);

  backboneUtils.rewriteFile({
    file: cfgFile,
    needle: '//m:i18n',
    splicable: [
      '{locale: \'' + this.locale + '\'},'
    ]
  });
};
