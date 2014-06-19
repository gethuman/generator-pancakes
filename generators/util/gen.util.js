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
        helper.transform(this, '_test.util.js_', 'test/unit/utils/test.' + this.utilName + '.js', { utilName: this.utilName });
    }
});


