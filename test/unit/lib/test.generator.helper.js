/**
 * Unit tests for generator mixins
 */
var taste   = require('../../taste');
var name    = 'lib/generator.helper';
var helper  = taste.target(name);

describe('Unit tests for ' + name, function () {

    describe('getPascalCase()', function () {
        it('should return pascal case for a dot notation string', function () {
            var original = 'some.thing.here';
            var expected = 'SomeThingHere';
            var actual = helper.getPascalCase(original);
            actual.should.equal(expected);
        });
    });

    describe('transform()', function () {
        var testFileContents = 'someVal is anotherVal with someVal';
        var generator;

        // new generator before each test
        beforeEach(function () {
            generator = {
                copy: taste.spy(),
                writeFileFromString: taste.spy(),
                readFileAsString: function () { return testFileContents; },
                sourceRoot: function () { return 'source'; },
                destinationRoot: function () { return 'dest'; }
            };
        });

        it('should return without doing anything if no source', function () {
            helper.transform();
            generator.copy.should.not.have.been.called;
            generator.writeFileFromString.should.not.have.been.called;
        });

        it('should just do a copy if no replace', function () {
            helper.transform(generator, 'source', 'dest');
            generator.copy.should.have.been.called;
        });

        it('should do a replace using a function', function () {
            var transformStr = 'hello, world';
            helper.transform(generator, 'foo', 'choo', function (file) {
                file.should.equal(testFileContents);
                return transformStr;
            });
            generator.writeFileFromString.should.have.been.calledWith(transformStr, 'dest/choo');
        });

        it('should do replace using a map', function () {
            var replaceVal = 'another val';
            var expected = 'another val is anotherVal with another val';
            helper.transform(generator, 'foo', 'choo', { someVal: replaceVal });
            generator.writeFileFromString.should.have.been.calledWith(expected, 'dest/choo');
        });
    });
});
