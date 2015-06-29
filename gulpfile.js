var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
	coffee = require('gulp-coffee'),
    es = require('event-stream');

var sources = {
	css: 'css/src',
	js: 'js/src'
};

// Define destinations object
var destinations = {
	css: 'css',
	js: 'js'
};

// Compile and copy Stylus
gulp.task('css', function() {
	return gulp.src(sources.css + '/*.styl').
		pipe( stylus({ whitespace: true }) ).on('error', errorHandler).
		pipe( csso() ).
		pipe( gulp.dest(destinations.css) );
});

gulp.task('js', function() {
	return es.merge(
			gulp.src(sources.js + '/*.coffee').
				pipe( coffee() ).on('error', errorHandler), 
			gulp.src(sources.js + '/*.js')).
		pipe( uglify() ).
		pipe( concat('all.min.js') ).
		pipe( gulp.dest(destinations.js) );
});


// Watch sources for change, executa tasks
gulp.task('watch', function() {
    gulp.watch(sources.css + '/*.styl',['css']);
    gulp.watch(sources.js + '/*.js',['js']);
    gulp.watch(sources.js + '/*.coffee',['js']);
});


// Define default task
gulp.task('default', ['css', 'js', 'watch']);

// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
