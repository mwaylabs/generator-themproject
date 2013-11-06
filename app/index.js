'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');


var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  this.testFramework = this.options['test-framework'] || 'mocha';
  this.hookFor(this.testFramework, {
    as: 'app',
    options: {
      options: {
        'skip-install': this.options['skip-install']
      }
    }
  });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    if (['app', 'tmp2'].indexOf(this.generatorName) >= 0) {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  artwork();

  var prompts = [{
    type: 'confirm',
    name: 'sass',
    message: 'Use Sass?',
    default: false
  }];

  this.prompt(prompts, function (answers) {
    this.useSass = answers.sass;

    // TODO Implement CoffeeScript, requireJS support
    this.includeRequireJS = false;
    this.useCoffee = false;

    cb();
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
  this.template('grunt.config.js');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  var ext = '.css';
  if (this.useSass) {
    ext = '.scss';
  }
  this.write('app/styles/main' + ext, '');
};

Generator.prototype.writeIndex = function writeIndex() {
  if (this.includeRequireJS) {
    return;
  }

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  var vendorJS = [
    'bower_components/jquery/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',
    'bower_components/backbone.stickit/backbone.stickit.js',
    'bower_components/tmpl/tmpl.js',
    'bower_components/hammerjs/dist/hammer.js',
    'bower_components/socket.io-client/dist/socket.io.js',
    'bower_components/momentjs/min/moment-with-langs.js',
    'bower_components/tmp2/tmp2.js'
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
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

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

  var mainJsFile = this.engine(this.read('requirejs_app.js'), this);

  this.write('app/scripts/main.js', mainJsFile);
};

Generator.prototype.createAppFile = function createAppFile() {
  if (this.includeRequireJS) {
    return;
  }

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('app.' + ext, 'app/scripts/main.' + ext);
};

var artwork = function artwork() {
  var schema = [''];
  schema.push('####################');
  schema.push('####################');
  schema.push('####   ######   ####');
  schema.push('####  #  ##  #  ####');
  schema.push('####  ###  ###  ####');
  schema.push('####  ########  ####');
  schema.push('####################');
  schema.push('####################');

  var lineColor = 22;

  function getBlue() {
    return ' \u001b[48;5;' + lineColor + 'm';
  };

  function getGrey() {
    return ' \u001b[0m';
  };

  function updateLineColor(s) {
    if (s < schema.length / 2) {
      lineColor += 1;
    } else {
      lineColor -= 1;
    }
  };

  function draw() {
    var s, i;
    for (s in schema) {
      var line = '';
      var inner = schema[s].split('');
      for (i in inner) {
        if (inner[i] === '#') {
          line += getBlue();
        } else if (inner[i] === ' ') {
          line += getGrey();
        }
      }
      updateLineColor(s);
      line += getGrey();
      console.log(line);
    }
    console.log(getGrey());
    console.log('    The-M-Project');
    console.log(getGrey());
  };
  draw();
};
