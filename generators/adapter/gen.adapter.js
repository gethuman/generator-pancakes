/**
 * Adapter generator for Pancakes
 */
var yeoman  = require('yeoman-generator');
var helper  = require('../../lib/generator.helper');

module.exports = yeoman.generators.Base.extend({

    /**
     * Create adapter generator
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
            this.adapterName = this.arguments[0];
            this.adapterType = this.arguments[1];
            done();
        }
        else {
            var prompts = [
                {
                    'type':     'input',
                    'name':     'adapterName',
                    'message':  'What is the name of the adapter (ex. mongo, elasticsearch, etc.)?'
                },
                {
                    'type':     'input',
                    'name':     'adapterType',
                    'message':  'What is the type of the adapter (ex. persist, search, etc.)?'
                }
            ];

            this.prompt(prompts, function (answers) {
                this.adapterName = answers.adapterName;
                this.adapterType = answers.adapterType;
                done();
            }.bind(this));
        }
    },

    /**
     * Create util file with the appropriate name
     */
    copyFiles: function () {
        var name = this.adapterName + '.' + this.adapterType;

        helper.transform(this,
            '_adapter.js_',
            'services/adapters/' + this.adapterType + '/' + name + '.adapter.js',
            { AdapterName: helper.getPascalCase(this.adapterName) }
        );

        helper.transform(this,
            '_test.adapter.js_',
            'test/intgration/services/adapters/' + this.adapterType + '/test.' + name + '.adapter.js',
            {
                adapterName: this.adapterName,
                adapterType: this.adapterType
            }
        );
    }
});


