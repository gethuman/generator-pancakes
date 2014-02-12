/**
 * Subgenerator used to create a pancakes util and associated tests
 */
var util    = require('util');
var yeoman  = require('yeoman-generator');

/**
 * Subgenerator constructor
 */
var UtilGenerator = module.exports = function UtilGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

// in herit from named base
util.inherits(UtilGenerator, yeoman.generators.NamedBase);

/**
 * Generate the util files
 */
UtilGenerator.prototype.files = function () {
  this.template('utils/_util.template.js_', 'utils/' + this.name + '.js');
  this.template('test/unit/utils/_test.util.template.js_', 'test/unit/utils/test.' + this.name + '.js');
};
