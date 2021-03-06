'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');
var backboneUtils = require('../util.js');


var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.env.options.appPath = this.options.appPath || 'app';
  this.config.set('appPath', this.env.options.appPath);

  this.testFramework = this.options['test-framework'] || 'mocha';
  this.templateFramework = this.options['template-framework'] || 'lodash';

  if (['app', 'm'].indexOf(this.generatorName) >= 0) {
    this.hookFor(this.testFramework, {
      as: 'app',
      options: {
        'skip-install': this.options['skip-install'],
        'ui': this.options.ui
      }
    });
  }

  var generators = 'm|app|model|collection|view|layout|controller|router|i18n'.split('|');
  if (generators.indexOf(this.generatorName) === -1) {
    console.log( '\'' + this.generatorName + '\' is not a valid generator command. See \'yo m --help\'');
    process.kill();
  }

  this.config.defaults({
    ui: this.options.ui,
    coffee: this.options.coffee,
    testFramework: this.testFramework,
    templateFramework: this.templateFramework,
    compassBootstrap: this.compassBootstrap,
    includeRequireJS: this.includeRequireJS
  });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    if (['app', 'm'].indexOf(this.generatorName) >= 0) {
      if (/^.*test$/.test(process.cwd())) {
        process.chdir('..');
      }
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  artwork();

  var templateCollection = this.getScaffoldingTemplates();

  var prompts = [
    {
      type: 'rawlist',
      name: 'scaffoldingTemplate',
      message: 'Would you like to create an example? Please choose a template.',
      choices: templateCollection
    },
    {
      type: 'confirm',
      name: 'compassBootstrap',
      message: 'Would you like to use Sass?',
      default: false
    }
  ];

  this.prompt(prompts, function (answers) {
    this.compassBootstrap = answers.compassBootstrap;
    this.scaffoldingTemplate = templateCollection[answers.scaffoldingTemplate];

    this.config.set('compassBootstrap', this.compassBootstrap);

    // TODO Implement CoffeeScript, requireJS support
    this.includeRequireJS = false;
    this.options.requirejs = this.includeRequireJS;
    this.config.set('includeRequireJS', this.includeRequireJS);

    this.options.coffee = false;
    this.config.set('coffee', this.options.coffee);

    cb();
  }.bind(this));
};

Generator.prototype.git = function git() {
  this.template('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
  this.template('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.gruntconfigfile = function gruntconfigfile() {
  this.template('grunt.config.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  var ext = '.css';
  if (this.compassBootstrap) {
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
    'bower_components/hammerjs/hammer.js',
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/shake.js/shake.js',
    'bower_components/socket.io-client/dist/socket.io.js',
    'bower_components/enquire/dist/enquire.js',
    'bower_components/momentjs/min/moment-with-langs.js',
    'bower_components/themproject/dist/themproject.js'
  ];

  if (this.templateFramework === 'handlebars') {
    vendorJS.push('bower_components/handlebars/handlebars.js');
  }

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor.js', vendorJS);

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    searchPath: ['.tmp', this.env.options.appPath],
    optimizedPath: 'scripts/main.js',
    sourceFileList: [
      'scripts/config.js',
      'scripts/main.js',
      'scripts/templates.js'
    ]
  });

  var order = 'models|collections|views|layouts|controllers|routes'.split('|');
  order.forEach(function (group, i) {
    order[i] = '<!-- m:' + group + ' -->';
  });
  this.indexFile = backboneUtils.rewrite({
    needle: '<!-- endbuild -->',
    haystack: this.indexFile,
    splicable: order
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
  this.mkdir(this.env.options.appPath);
  this.mkdir(this.env.options.appPath + '/scripts');
  this.mkdir(this.env.options.appPath + '/scripts/vendor/');
  this.mkdir(this.env.options.appPath + '/styles');
  this.mkdir(this.env.options.appPath + '/images');
  this.copy('app/icons/favicon.png', this.env.options.appPath + '/icons/favicon.png');
  this.copy('app/icons/android-l.png', this.env.options.appPath + '/icons/android-l.png');
  this.copy('app/icons/android-m.png', this.env.options.appPath + '/icons/android-m.png');
  this.copy('app/icons/android-s.png', this.env.options.appPath + '/icons/android-s.png');
  this.copy('app/icons/apple-ipad-retina.png', this.env.options.appPath + '/icons/apple-ipad-retina.png');
  this.copy('app/icons/apple-ipad.png', this.env.options.appPath + '/icons/apple-ipad.png');
  this.copy('app/icons/apple-iphone.png', this.env.options.appPath + '/icons/apple-iphone.png');
  this.copy('app/icons/apple-iphone-retina.png', this.env.options.appPath + '/icons/apple-iphone-retina.png');
  this.copy('app/splash/apple-splash-iphone.png', this.env.options.appPath + '/splash/apple-splash-iphone.png');
  this.copy('app/splash/apple-splash-iphone-retina.png', this.env.options.appPath + '/splash/apple-splash-iphone-retina.png');
  this.copy('app/splash/apple-splash-iphone-retina5.png', this.env.options.appPath + '/splash/apple-splash-iphone-retina5.png');
  this.copy('app/splash/apple-splash-ipad-portrait.png', this.env.options.appPath + '/splash/apple-splash-ipad-portrait.png');
  this.copy('app/splash/apple-splash-ipad-landscape.png', this.env.options.appPath + '/splash/apple-splash-ipad-landscape.png');
  this.copy('app/splash/apple-splash-ipad-portrait-retina.png', this.env.options.appPath + '/splash/apple-splash-ipad-portrait-retina.png');
  this.copy('app/splash/apple-splash-ipad-landscape-retina.png', this.env.options.appPath + '/splash/apple-splash-ipad-landscape-retina.png');
  this.write(this.env.options.appPath + '/index.html', this.indexFile);

  this.sourceRoot(path.join(__dirname, '../templates'));
  this.writeTemplate('i18n', this.env.options.appPath + '/i18n/en');
};

Generator.prototype.mainJs = function mainJs() {
  if (!this.includeRequireJS) {
    return;
  }
  this.writeTemplate('main', this.env.options.appPath + '/scripts/main');
};

Generator.prototype.createAppFile = function createAppFile() {
  if (this.includeRequireJS) {
    return;
  }
  this.writeTemplate('app', this.env.options.appPath + '/scripts/main');
};

Generator.prototype.configJS = function configJS() {
  this.writeTemplate('config', this.env.options.appPath + '/scripts/config');
};

Generator.prototype.scaffoldingApp = function scaffoldingApp() {
  if (!this.scaffoldingTemplate || this.scaffoldingTemplate && this.scaffoldingTemplate.value === 0) {
    return;
  }

  // Adds scripts to index.html
  while (this.scaffoldingTemplate.scripts.length > 0) {
    var name = this.scaffoldingTemplate.scripts.shift();
    this.addScriptToIndex(name, name.split('/')[0]);
  }

  // Copy files into the project and force overrides
  this.conflicter.force = true;
  this.directory(this.scaffoldingTemplate.path + '/files', this.env.options.appPath);
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
    var isMac = !process.platform.match(/^win/);
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
      if(isMac) {
        updateLineColor(s);
      }
      line += getGrey();
      console.log(line);
    }
    console.log(getGrey());
    console.log('    The-M-Project');
    console.log(getGrey());
  };
  draw();
};