/**
 * Resource generator for Pancakes
 */
var util    = require('util');
var path    = require('path');
var yeoman  = require('yeoman-generator');

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
     * Create util file with the appropriate name
     */
    copyFiles: function () {

        this.mkdir('services/resources/' + this.resourceName);

        var resourceJs = this.readFileAsString(this.sourceRoot() + '/_resource.js_');
        resourceJs = resourceJs.replace(/resourceName/g, this.resourceName);
        this.writeFileFromString(resourceJs, this.destinationRoot() +
            '/services/resources/' + this.resourceName + '/' + this.resourceName + '.resource.js');

    }
});


