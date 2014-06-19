/**
 * Main generator for Pancakes
 */
//var path    = require('path');
var yeoman  = require('yeoman-generator');
var helper  = require('../../lib/generator.helper');

module.exports = yeoman.generators.Base.extend({

    /**
     * Constructor for our Pancakes Generator
     */
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

//        this.on('end', function () {
//            this.installDependencies({ skipInstall: options['skip-install'] });
//        });
//
//        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    },

    /**
     * Main interactions with user to gather information
     */
    promptUser: function () {
        var done = this.async();

        if (this.arguments.length) {
            this.appName = this.arguments[0];
            done();
        }
        else {
            var prompts = [{
                'type':     'input',
                'name':     'appName',
                'default':  'noname',
                'message':  'What is the name of your new app (ex. answers, frontStage, etc.)?'
            }];

            this.prompt(prompts, function (answers) {
                this.appName = answers.appName;
                done();
            }.bind(this));
        }
    },

    /**
     * Make dirs and copy files
     */
    copyFiles: function () {

        // create the app folder and cd into it
        this.mkdir(this.appName);
        this.destinationRoot(this.appName);

        this.mkdir('app');
        this.mkdir('app/common');
        this.mkdir('app/common/filters');
        this.mkdir('app/common/layouts');
        this.mkdir('app/common/ng.directives');
        this.mkdir('app/common/ng.providers');
        this.mkdir('app/common/pages');
        this.mkdir('app/common/partials');
        this.mkdir('app/common/styles');
        this.mkdir('app/common/utils');
        this.mkdir('assets');
        this.mkdir('assets/csslibs');
        this.mkdir('assets/fonts');
        this.mkdir('assets/html');
        this.mkdir('assets/img');
        this.mkdir('assets/jslibs');
        this.mkdir('batch');
        this.mkdir('bin');
        this.mkdir('config');
        this.mkdir('middleware');
        this.mkdir('services');
        this.mkdir('services/adapters');
        this.mkdir('services/filters');
        this.mkdir('services/reactors');
        this.mkdir('services/resources');
        this.mkdir('test');
        this.mkdir('test/api');
        this.mkdir('test/bootstrap');
        this.mkdir('test/external');
        this.mkdir('test/integration');
        this.mkdir('test/karma');
        this.mkdir('test/protractor');
        this.mkdir('test/unit');
        this.mkdir('transformers');
        this.mkdir('utils');

        this.copy('_gitignore_', '.gitignore');
        this.copy('_gulpfile.js_', 'gulpfile.js');
        this.copy('_index.js_', 'index.js');
        this.copy('_README.md_', 'README.md');
        this.copy('test/_mocha.opts_', 'test/mocha.opts');
        this.copy('test/_taste.js_', 'test/taste.js');
        this.copy('config/_config.base.js_', 'config/config.base.js');
        this.copy('config/_config.dev.js_', 'config/config.dev.js');
        this.copy('config/_env.js_', 'config/env.js');
        this.copy('config/_index.js_', 'config/index.js');
        this.copy('app/common/_common.app.js_', 'app/common/common.app.js');
        this.copy('app/common/styles/_global.styles.less_', 'app/common/styles/global.styles.less');
        this.copy('app/common/styles/_mixins.less_', 'app/common/styles/mixins.less');
        this.copy('services/adapters/_base.adapter.js_', 'services/adapters/base.adapter.js');
        this.copy('services/resources/_fieldsets.js_', 'services/resources/fieldsets.js');

        helper.transform(this, '_bower.json_', 'bower.json', { AppName: this.appName });
        helper.transform(this, '_package.json_', 'package.json', { AppName: this.appName });
    }
});


