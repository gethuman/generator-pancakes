/**
 * Transformer generator for Pancakes
 */
var yeoman  = require('yeoman-generator');
var helper  = require('../../lib/generator.helper');

module.exports = yeoman.generators.Base.extend({

    /**
     * Create transformer generator
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
            this.transType = this.arguments[0];
            this.transName = this.arguments[1];
            done();
        }
        else {
            var prompts = [
                {
                    'type':     'input',
                    'name':     'transType',
                    'message':  'What type of transformer is this?'
                },
                {
                    'type':     'input',
                    'name':     'transName',
                    'message':  'What is the name of the transformer?'
                }
            ];

            this.prompt(prompts, function (answers) {
                this.transType = answers.transType;
                this.transName = answers.transName;
                done();
            }.bind(this));
        }
    },

    /**
     * Create util file with the appropriate name
     */
    copyFiles: function () {
        var name = this.transType + '.' + this.transName;

        this.copy('_tpl.template_', 'transformers/' + name + '.template');

        helper.transform(this,
            '_transformer.js_',
            'transformers/' + name + '.transformer.js',
            {
                transName: this.transName,
                TransName: helper.getPascalCase(this.transName)
            }
        );

        helper.transform(this,
            '_test.transformer.js_',
            'test/unit/transformers/test.' + name + '.transformer.js',
            { transName: this.transName }
        );
    }
});


