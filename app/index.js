'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var PancakesGenerator = module.exports = function PancakesGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PancakesGenerator, yeoman.generators.Base);

PancakesGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

    /*

    desired flow:

    1. check to see if already in generated project (i.e. package.json exists)
        - if so, display options for sub generators
        - if now, ask questions to do initial generation
            - create directories, create files with defaults
    2. for sub-generators
        - add app
        - add resource


     */





  var prompts = [{
    'type': 'confirm',
    'name': 'someOption',
    'message': 'Would you like to enable this option?',
    'default': true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));


};

PancakesGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

PancakesGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};