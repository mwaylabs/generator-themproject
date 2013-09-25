'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var router = require('../router');


var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.testFramework = this.options['test-framework'] || 'mocha';
  this.templateFramework = this.options['template-framework'] || 'lodash';
  this.hookFor(this.testFramework, {
    as: 'app',
    options: {
      options: {
        'skip-install': this.options['skip-install']
      }
    }
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js and Modernizr.');

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Use Sass',
      value: 'sass',
      checked: false
    }]
  }];

  if (!this.options.coffee) {
    prompts[0].choices.push({
      name: 'Use CoffeeScript',
      value: 'coffee',
      checked: false
    });
  }

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.sass = hasFeature('sass');

    if (!this.options.coffee) {
      this.options.coffee   = hasFeature('coffee');
    }

    if (!this.options.coffee) {
      this.prompt([{
        type: 'confirm',
        name: 'includeRequireJS',
        message: 'Add RequireJS ?'
      }], function (answers) {
        this.includeRequireJS = answers.includeRequireJS;

        cb();
      }.bind(this));
    } else {
      this.includeRequireJS = false;
      cb();
    }
  }.bind(this));
};

Generator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.gruntconfigfile = function gruntconfigfile() {
  this.template('grunt.config.json');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  var ext = '.css';
  if (this.sass) {
    ext = '.scss';
  }
  this.write('app/styles/main' + ext, '');
};

Generator.prototype.writeIndex = function writeIndex() {
  if (this.includeRequireJS) {
    return;
  }

  var vendorJS = [
    'bower_components/jquery/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',
    'bower_components/backbone.stickit/backbone.stickit.js',
    'bower_components/layoutmanager/backbone.layoutmanager.js',
    'bower_components/tmp2/tmp2.js',
    'bower_components/fastclick/lib/fastclick.js'
  ];

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor.js', vendorJS);

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    searchPath: ['.tmp', 'app'],
    optimizedPath: 'scripts/main.js',
    sourceFileList: [
      'scripts/main.js',
      'scripts/templates.js'
    ]
  });
};

Generator.prototype.writeIndexWithRequirejs = function writeIndexWithRequirejs() {
  if (!this.includeRequireJS) {
    return;
  }

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
    'bower_components/requirejs/require.js'
  ], {'data-main': 'scripts/main'});
};

Generator.prototype.setupEnv = function setupEnv() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/scripts/vendor/');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.template('app/favicon.ico');
  this.write('app/index.html', this.indexFile);
};

Generator.prototype.mainJs = function mainJs() {
  if (!this.includeRequireJS) {
    return;
  }

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  var mainJsFile = this.engine(this.read('requirejs_main.js'), this);

  this.write('app/scripts/main.js', mainJsFile);
};

Generator.prototype.mainRouterJs = function mainJs() {
  if (!this.includeRequireJS) {
    return;
  }

  var routerGenerator = new router(['router'], {
    env: this.options.env,
    resolved: __filename
  });
  routerGenerator.createControllerFiles();
};

Generator.prototype.createAppFile = function createAppFile() {
  if (!this.includeRequireJS) {
    return;
  }
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('app.' + ext, 'app/scripts/app.' + ext);
};

Generator.prototype.createMainFile = function createMainFile() {
  if (this.includeRequireJS) {
    return;
  }
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('main.' + ext, 'app/scripts/main.' + ext);
};
