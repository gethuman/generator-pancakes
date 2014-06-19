/**
 * Transformer generator for Pancakes
 */
var _       = require('lodash');
var util    = require('util');
var path    = require('path');
var yeoman  = require('yeoman-generator');

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
                    'default':  'ng',
                    'message':  'What type of transformer is this?'
                },
                {
                    'type':     'input',
                    'name':     'transName',
                    'message':  'What is the name of the transformer?'
                }
            ];

            this.prompt(prompts, function (answers) {
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
        var nameParts = this.transName.split('.');
        var pascalCaseName = '';
        _.each(nameParts, function (namePart) {
            pascalCaseName += namePart.substring(0, 1).toUpperCase() + namePart.substring(1);
        });

        this.copy('_tpl.template_', 'transformers/' + name + '.template');

        var transJs = this.readFileAsString(this.sourceRoot() + '/_transformer.js_');
        transJs = transJs.replace(/transName/, this.transName);
        transJs = transJs.replace(/TransName/g, pascalCaseName);
        this.writeFileFromString(transJs, this.destinationRoot() + '/transformers/' + name + '.transformer.js');

        this.mkdir('test/unit/transformers');

        var testTransJs = this.readFileAsString(this.sourceRoot() + '/_test.transformer.js_');
        testTransJs = testTransJs.replace(/transName/, this.transName);
        this.writeFileFromString(testTransJs, this.destinationRoot() +
            '/test/unit/transformers/test.' + name + '.transformer.js');
    }
});


