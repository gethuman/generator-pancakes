/**
 * Resource generator for Pancakes
 */
var yeoman  = require('yeoman-generator');
var helper  = require('../../lib/generator.helper');

module.exports = yeoman.generators.Base.extend({

    /**
     * Create resource generator
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
            this.resourceName = this.arguments[0];
            done();
        }
        else {
            var prompts = [{
                'type':     'input',
                'name':     'resourceName',
                'message':  'What is the name of the resource?'
            }];

            this.prompt(prompts, function (answers) {
                this.resourceName = answers.resourceName;
                done();
            }.bind(this));
        }
    },

    /**
     * Create resource file with the appropriate name
     */
    copyFiles: function () {
        helper.transform(this,
            '_resource.js_',
            'services/resources/' + this.resourceName + '/' + this.resourceName + '.resource.js',
            { resourceName: this.resourceName }
        );
    }
});


