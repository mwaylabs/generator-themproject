/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');
var modelGenerator = require('../model');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  this.argument('modelName', { type: String, required: false });

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  // required for collection.js template which uses `appname`
}

util.inherits(Generator, scriptBase);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  if( this.modelName ) {
    cb();
    return;
  }

  var self = this;
  this.modelName = self.name;
  var config = [
    {
      type: 'expand',
      message: 'Should i create a model \'' + this.modelName + '\' for you?',
      choices: [
        {
          key: 'y',
          name: 'Yes please',
          value: function( cb ) {
            return cb(self.modelName);
          }
        },
        {
          key: 'n',
          name: 'No thanks, just a collection',
          value: function( cb ) {
            return cb(null);
          }
        },
        {
          key: 'r',
          name: 'I want to rename the model name',
          value: function( cb ) {
            return self.prompt([
              {
                message: 'Name',
                name: 'modelName'
              }
            ], function( result ) {
              cb(result.modelName);
            })
          }
        }
      ],
      name: 'overwrite'
    }
  ];

  this.prompt(config, function( result ) {
    result.overwrite(function( name ) {
      self.modelName = name;
      cb();
    });
  });
};

Generator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = this.options.coffee ? '.coffee' : '.js';
  var destFile = path.join('app/scripts/collections', this.name + ext);
  var isRequireJsApp = this.isUsingRequireJS();

  if (!isRequireJsApp) {
    this.template('collection' + ext, destFile);
    this.addScriptToIndexGroup('collections/' + this.name, 'collections');
  }
};

Generator.prototype.createModelFile = function createModelFile() {
  if( !this.modelName ) {
    return;
  }
  this.name = this.modelName;
  modelGenerator.prototype.createModelFiles.apply(this);
};