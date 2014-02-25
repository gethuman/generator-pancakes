/**
 * Author: Jeff Whelpley
 * Date: 2/25/14
 *
 * Build for the Pancakes Generator
 */
var gulp        = require('gulp');
var mocha       = require('gulp-mocha');
var jshint      = require('gulp-jshint');
var watch       = require('gulp-watch');

var alljs = ['test/**/*.js', 'app/**/*.js', 'util/**/*.js'];

gulp.task('jshint', function () {
    return gulp.src(alljs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
    return gulp.src('test/**/*.js')
        .pipe(mocha({
            growl: true,
            ui: 'bdd',
            reporter: 'progress',
            timeout: 5000
        }));
});

gulp.task('watch', function (){
    gulp.watch(['test/**/*.js', 'lib/**/*.js'], ['jshint', 'test']);
});

gulp.task('default', ['jshint', 'test']);
