/**
 * Main generator for Pancakes
 */
var util    = require('util');
var path    = require('path');
var yeoman  = require('yeoman-generator');

/**
 * Constructor for our Pancakes Generator
 * @param args
 * @param options
 */
var PancakesGenerator = function (args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

// inherit from yeoman base
util.inherits(PancakesGenerator, yeoman.generators.Base);

/**
 * Main interactions with user to gather information
 */
PancakesGenerator.prototype.askFor = function () {
    var cb = this.async();
    console.log(this.yeoman);

    var prompts = [
        {
            'type':     'confirm',
            'name':     'initialCheck',
            'message':  'Generate Pancakes scaffolding in the current directory?'
        }
    ];

    this.prompt(prompts, function (props) {

        if (!props.initialCheck) {
            console.log('Thanks for using pancakes! Exiting now.');
            process.exit(1);
        }

        // put any other questions here to get the user started

        cb();
    }.bind(this));
};

/**
 * This is where we are actually generating stuff
 */
PancakesGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('assets');
    this.mkdir('assets/css');
    this.mkdir('assets/fonts');
    this.mkdir('assets/html');
    this.mkdir('assets/img');
    this.mkdir('assets/jslibs');
    this.mkdir('batch');
    this.mkdir('bin');
    this.mkdir('config');
    this.mkdir('middleware');
    this.mkdir('middleware/monitoring');
    this.mkdir('middleware/rendering');
    this.mkdir('middleware/routing');
    this.mkdir('middleware/security');
    this.mkdir('middleware/startup');
    this.mkdir('services');
    this.mkdir('services/adapters');
    this.mkdir('services/enums');
    this.mkdir('services/resources');
    this.mkdir('services/wrappers');
    this.mkdir('test');
    this.mkdir('test/bootstrap');
    this.mkdir('test/unit');
    this.mkdir('test/integration');
    this.mkdir('test/e2e');
    this.mkdir('utils');

    this.copy('_gitignore_', '.gitignore');
    this.copy('_bower.json_', 'bower.json');
    this.copy('_gulpfile.js_', 'gulpfile.js');
    this.copy('_index.js_', 'index.js');
    this.copy('_package.json_', 'package.json');
    this.copy('_README.md_', 'README.md');
    this.copy('batch/_batch.start.js_', 'batch/batch.start.js');
    this.copy('test/_mocha.opts_', 'test/mocha.opts');
    this.copy('test/_taste.js_', 'test/taste.js');
};

// export the generator
module.exports = PancakesGenerator;


