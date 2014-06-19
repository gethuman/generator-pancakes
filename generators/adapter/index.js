/**
 * Adapter generator for Pancakes
 */
var _       = require('lodash');
var util    = require('util');
var path    = require('path');
var yeoman  = require('yeoman-generator');

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
        var nameParts = this.adapterName.split('.');
        var pascalCaseName = '';
        _.each(nameParts, function (namePart) {
            pascalCaseName += namePart.substring(0, 1).toUpperCase() + namePart.substring(1);
        });

        this.mkdir('services/adapters/' + this.adapterType);

        var adapterJs = this.readFileAsString(this.sourceRoot() + '/_adapter.js_');
        adapterJs = adapterJs.replace(/AdapterName/g, pascalCaseName);
        this.writeFileFromString(adapterJs, this.destinationRoot() +
            '/services/adapters/' + this.adapterType + '/' + name + '.adapter.js');

        this.mkdir('test/intgration/services');
        this.mkdir('test/intgration/services/adapters');
        this.mkdir('test/intgration/services/adapters/' + this.adapterType);

        var adapterTestJs = this.readFileAsString(this.sourceRoot() + '/_test.adapter.js_');
        adapterTestJs = adapterTestJs.replace(/adapterName/g, this.adapterName);
        adapterTestJs = adapterTestJs.replace(/adapterType/g, this.adapterType);
        this.writeFileFromString(adapterTestJs, this.destinationRoot() +
            '/test/intgration/services/adapters/' + this.adapterType +
            '/test.' + name + '.adapter.js');
    }
});


