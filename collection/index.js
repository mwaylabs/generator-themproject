/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

module.exports = Generator;

function Generator(args, options, config) {
  scriptBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  var testOptions = {
    as: 'collection',
    args: [this.name],
    options: {
      coffee: this.config.get('coffee'),
      ui: this.config.get('ui')
    }
  };

  if (this.geneateTests()) {
    this.hookFor('m-mocha', testOptions);
  }

  this.argument('modelName', { type: String, required: false });
  this.hookFor('m:model', {
    args: [this.modelName]
  });
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

      if(name) {
        self.modelName = name;
        self._hooks[1].args = [self.modelName];
      } else {
        self._hooks.pop();
      }
      cb();
    });
  });
};

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.writeTemplate('collection', path.join(this.env.options.appPath + '/scripts/collections', this.name));

  if (!this.options.requirejs) {
    this.addScriptToIndex('collections/' + this.name);
  }
};