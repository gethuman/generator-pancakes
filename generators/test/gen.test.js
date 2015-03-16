/**
 * Util generator for Pancakes
 */
var yeoman  = require('yeoman-generator');
var helper  = require('../../lib/generator.helper');

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

        if (this.arguments.length > 1) {
            this.testType = this.arguments[0];
            this.testName = this.arguments[1];

            if (this.arguments.length > 2) {
                this.testPath = this.arguments[2];
            }

            done();
        }
        else {
            var prompts = [
                {
                    'type':     'input',
                    'name':     'testType',
                    'message':  'What type of test?'
                },
                {
                    'type':     'input',
                    'name':     'testName',
                    'message':  'What is the name of the test?'
                },
                {
                    'type':     'input',
                    'name':     'testPath',
                    'message':  'What is the path to the test?'
                }
            ];

            this.prompt(prompts, function (answers) {
                this.testType = answers.testType;
                this.testName = answers.testName;
                this.testPath = answers.testPath;
                done();
            }.bind(this));
        }
    },

    /**
     * Create util file with the appropriate name
     */
    copyFiles: function () {
        var filePath = this.testPath ? this.testPath + '/' : '';
        var targetPath = filePath + this.testName;

        helper.transform(this, '_test.js_',
            'test/' + this.testType + '/' + filePath + 'test.' + this.testName + '.js',
            {
                testType: this.testType,
                targetPath: targetPath,
                testName: this.testName
            }
        );
    }
});


