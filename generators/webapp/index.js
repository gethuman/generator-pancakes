/**
 * Generator for new pancakes web app
 */
var util    = require('util');
var path    = require('path');
var yeoman  = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

    /**
     * Create util generator
     */
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
    },

    /**
     * Prompt user for information
     */
    prompts: function () {
        var done = this.async();

        if (this.arguments.length) {
            this.appName = this.arguments[0];
            done();
        }
        else {
            var prompts = [{
                'type':     'input',
                'name':     'appName',
                'message':  'What is the name of the app?'
            }];

            this.prompt(prompts, function (answers) {
                this.appName = answers.appName;
                done();
            }.bind(this));
        }
    },

    /**
     * Create util file with the appropriate name
     */
    copyFiles: function () {
        this.mkdir('app/' + this.appName);
        this.copy('_app.app.js_', 'app/' + this.appName + '/' + this.appName + '.app.js');
        this.mkdir('app/' + this.appName + '/filters');
        this.mkdir('app/' + this.appName + '/layouts');
        this.copy('_layout.js_', 'app/' + this.appName + '/layouts/' + this.appName + '.layout.js');
        this.copy('_layout.less_', 'app/' + this.appName + '/layouts/' + this.appName + '.layout.less');
        this.mkdir('app/' + this.appName + '/ng.directives');
        this.mkdir('app/' + this.appName + '/ng.providers');
        this.mkdir('app/' + this.appName + '/pages');
        this.mkdir('app/' + this.appName + '/partials');
        this.mkdir('app/' + this.appName + '/utils');

        // use ui generator to generate the home page
        this.invoke('pancakes:ui', { options: { appName: this.appName, uiType: 'page', uiName: this.appName + '.home' } });
    }
});


