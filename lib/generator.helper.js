/**
 * Mixin functions for pancakes generators
 */
var _ = require('lodash');

require('colors');
var createStr = '   create '.green;

module.exports = {

    /**
     * Copy a file from one location to another, but also change the file
     * @param generator
     * @param source
     * @param dest
     * @param replace
     */
    transform: function (generator, source, dest, replace) {

        // if no source or destination, there is nothing we can do, so return
        if (!generator || !source || !dest) { return; }

        // if nothing to be replaced, just do a simple copy and return
        if (!replace) { generator.copy(source, dest); return; }

        // we are replacing so first get the file contents
        var fileStr = generator.readFileAsString(generator.sourceRoot() + '/' + source);

        // if replace is a string, call it, else loop through replace values
        if (_.isFunction(replace)) {
            fileStr = replace(fileStr);
        }
        else {
            _.each(replace, function (replaceStr, expr) {
                fileStr = fileStr.replace(new RegExp(expr, 'g'), replaceStr);
            });
        }

        // we need to make sure all directories exist for the destination
        var fileParts = dest.split('/');
        for (var i = 0; i < (fileParts.length - 1); i++) {      // last item in array is file name so length - 1
            generator.mkdir(fileParts.slice(0, i + 1).join('/'));    // ensure directory created
        }

        generator.writeFileFromString(fileStr, generator.destinationRoot() + '/' + dest);
        console.log(createStr + dest);
    },

    /**
     * Get the pascal case for a given name that has dot notation
     * @param name
     */
    getPascalCase: function (name) {
        var nameParts = name.split('.');
        var pascalCaseName = '';
        _.each(nameParts, function (namePart) {
            pascalCaseName += namePart.substring(0, 1).toUpperCase() + namePart.substring(1);
        });

        return pascalCaseName;
    }
};
