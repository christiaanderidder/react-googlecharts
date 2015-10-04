/*jslint node: true */
'use strict';

// Dependencies
var browserify		= require('browserify');
var watchify		= require('watchify');
var babelify		= require('babelify');
var gulp            = require('gulp');
var utils 			= require('gulp-util');
var buffer 			= require('gulp-buffer');
var babel 			= require('gulp-babel');
var source			= require('vinyl-source-stream');
var sourcemaps		= require('gulp-sourcemaps');

function buildExample(shouldWatch){
	var bundler = watchify(browserify({
		entries: './examples/main.js',
		debug: true,
		cache: {}, // required for watchify
		packageCache: {}, // required for watchify
		fullPaths: shouldWatch // required to be true only for watchify
	})).transform(babelify).on('log', utils.log); 

	function rebundle(changedFiles) {
		var bundleStream = bundler.bundle()
			.on('error', utils.log.bind(utils, 'Browserify Error'))
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./examples/build'));
	}

	if(shouldWatch) {
		bundler.on('update', rebundle);
	}

	rebundle();
};

gulp.task('test-watch', function() {
	return buildExample(true);
});

gulp.task('test', function() {
	return buildExample(false);
});

gulp.task('prepublish', function() {
	gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('build'));
});

gulp.task('default', ['test-watch']);