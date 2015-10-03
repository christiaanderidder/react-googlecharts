/*jslint node: true */
'use strict';

// Dependencies
var browserify		= require('browserify');
var watchify		= require('watchify');
var babelify		= require('babelify');
var gulp            = require('gulp');
var utils 			= require('gulp-util');
var buffer 			= require('gulp-buffer');
var source			= require('vinyl-source-stream');
var sourcemaps		= require('gulp-sourcemaps');

function buildJs(shouldWatch){
	var bundler = watchify(browserify({
		entries: './tests/main.js',
		debug: true,
		cache: {}, // required for watchify
    	packageCache: {}, // required for watchify
    	fullPaths: shouldWatch // required to be true only for watchify
	})).transform(babelify).on('log', utils.log); 

	function rebundle(changedFiles) {
		var bundleStream = bundler.bundle()
			.on('error', utils.log.bind(utils, 'Browserify Error'))
			.pipe(source('main.built.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./tests'));
	}

	if(shouldWatch) {
		bundler.on('update', rebundle);
	}

	rebundle();
};

gulp.task('test-watch', function(){
	return buildJs(true);
});

gulp.task('test', function(){
	return buildJs(false);
});

gulp.task('default', ['test-watch']);

