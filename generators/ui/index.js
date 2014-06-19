/**
 * Generate a page or partial for an app
 */
var util    = require('util');
var path    = require('path');
var yeoman  = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

    /**
     * UI generator can be called by other generators
     */
    constructor: function (args, options) {
        yeoman.generators.Base.apply(this, arguments);
        this.appName = options.appName;
        this.uiType = options.uiType;
        this.uiName = options.uiName;
    },

    /**
     * Prompt user for information
     */
    prompts: function () {
        var done = this.async();

        // if values passed in through options from another generator
        if (this.appName && this.uiType && this.uiName) {
            done();
        }
        // if values passed in through the command line (ex: yo pancakes:ui app page some.thing)
        else if (this.arguments.length > 2) {
            this.appName = this.arguments[0];
            this.uiType = this.arguments[1];
            this.uiName = this.arguments[2];
            done();
        }
        // else prompt the user
        else {
            var prompts = [
                {
                    'type':     'input',
                    'name':     'appName',
                    'message':  'What is the name of the app?'
                },
                {
                    'type':     'list',
                    'name':     'uiType',
                    'choices':  ['page', 'partial'],
                    'message':  'What type of component?'
                },
                {
                    'type':     'input',
                    'name':     'uiName',
                    'message':  'What is the name of the component (w/o .page.js or .partial.js)?'
                }
            ];

            this.prompt(prompts, function (answers) {
                this.appName = answers.appName;
                this.uiType = answers.uiType;
                this.uiName = answers.uiName;
                done();
            }.bind(this));
        }
    },

    /**
     * Create util file with the appropriate name
     */
    copyFiles: function () {
        this.copy('_ui.js_', 'app/' + this.appName + '/' + this.uiType + 's/' + this.uiName + '.' + this.uiType + '.js');
        this.copy('_ui.less_', 'app/' + this.appName + '/' + this.uiType + 's/' + this.uiName + '.' + this.uiType + '.less');

        this.mkdir('test/integration/app');
        this.mkdir('test/integration/app/' + this.appName);
        this.mkdir('test/integration/app/' + this.appName + '/' + this.uiType + 's');

        var testUiJs = this.readFileAsString(this.sourceRoot() + '/_test.ui.js_');
        testUiJs = testUiJs.replace(/appName/, this.appName);
        testUiJs = testUiJs.replace(/uiType/g, this.uiType);
        testUiJs = testUiJs.replace(/uiName/, this.uiName);
        this.writeFileFromString(testUiJs, this.destinationRoot() +
            '/test/integration/app/' + this.appName + '/' + this.uiType + 's/test.' + this.uiName + '.' + this.uiType + '.js');
    }
});


