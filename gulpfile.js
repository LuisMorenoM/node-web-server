//All dependences
var gulp 			= require('gulp'), //gulp
	pump 			= require('pump'), //show js errors
	babel			= require('gulp-babel'), //compile es6 js
	header 			= require('gulp-header'), //add header comment

	sass 			= require('gulp-sass'), //to compile sass
	concat 			= require('gulp-concat'), //to concat multiple files
	rename 			= require('gulp-rename'), //to rename
	uglify 			= require('gulp-uglify'), //to uglify js
	minify			= require('gulp-minify-css'), //to minify css
	autoprefixer 	= require('gulp-autoprefixer'); //auto prefix
	notify 			= require('gulp-notify'); //notify

//paths
var path = {
	js 		: './public/js/**/*.js',
	sass 	: './public/sass/base.scss',
	build 	: './public/build'
}

var pkg = require('./package.json');
var banner = 
	['/**',
		' * <%= pkg.name %>',
		' * @version v<%= pkg.version %>',
		' */',
	''].join('\n');

//SASS task. Compile css, concat all in 1 and minify
gulp.task('sass', function(){
	gulp.src(path.sass)
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest(path.build))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minify())
		// .pipe(livereload(server))
		.pipe(gulp.dest(path.build))
		.pipe(notify({ message: 'Styles task complete' }));
})

//JS task. Compile es6 JS, concat all files in 1, uglify and rename to .min
gulp.task('js', function(cb) {
	pump([
		gulp.src(path.js)
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('base.js'))
		.pipe(gulp.dest(path.build))
		.pipe(uglify())
		.pipe(rename('base.min.js'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(notify({ message: 'Scripts task complete' })),
		gulp.dest(path.build)
	], cb );
})

//execute sass, js and minify-css
gulp.task('all', ['sass', 'js'])

//watch to save
gulp.task('watch', function() {
	gulp.watch('./public/sass/**/*.scss', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		gulp.run('sass');
	});
	gulp.watch('./public/js/**/*.js', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		gulp.run('js');
	});
})