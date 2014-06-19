/**
 * Util generator for Pancakes
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
            this.utilName = this.arguments[0];
            done();
        }
        else {
            var prompts = [{
                'type':     'input',
                'name':     'utilName',
                'message':  'What is the name of the util?'
            }];

            this.prompt(prompts, function (answers) {
                this.utilName = answers.utilName;
                done();
            }.bind(this));
        }
    },

    /**
     * Create util file with the appropriate name
     */
    copyFiles: function () {
        this.copy('_util.js_', 'utils/' + this.utilName + '.js');

        this.mkdir('test/unit/utils');

        var utilJs = this.readFileAsString(this.sourceRoot() + '/_test.util.js_');
        utilJs = utilJs.replace(/utilName/, this.utilName);
        this.writeFileFromString(utilJs, this.destinationRoot() + '/test/unit/utils/test.' + this.utilName + '.js');
    }
});


