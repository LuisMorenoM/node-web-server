//All dependences
var gulp 		  	= require('gulp'), //gulp
	pump 			= require('pump'), //show js errors
	babel			= require('gulp-babel'), //compile es6 js
	header 			= require('gulp-header'), //add header comment

	sass 			= require('gulp-sass'), //to compile sass
    concat 			= require('gulp-concat'), //to concat
    rename 			= require('gulp-rename'), //to rename
    uglify 			= require('gulp-uglify'), //to uglify js
    minify			= require('gulp-minify-css'), //to minify css
    autoprefixer 	= require('gulp-autoprefixer'); //auto prefix(no use)

//paths
var path = {
	js 		: './public/js/base.js',
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
		.pipe(sass())
		.pipe(concat('base.css'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest(path.build))
})

//minifyCSS
gulp.task('minify-css', function(){
	gulp.src(path.build + '/base.css')
		.pipe(concat('base.min.css'))
		.pipe(minify())
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest(path.build))
})

//JS task. Compile es6 JS, concat all files in 1, uglify and rename to .min
gulp.task('js', function(cb) {
	pump([
	    gulp.src(path.js)
	    .pipe(babel({
	        presets: ['env']
	    }))
		.pipe(concat('base.js'))
		.pipe(uglify())
		.pipe(rename('base.min.js'))
		.pipe(header(banner, { pkg : pkg } )),
		gulp.dest(path.build)
	], cb );
})

//execute sass, js and minify-css
gulp.task('all', ['sass', 'minify-css', 'js'])

//watch to save
gulp.task('watch', function() {
	gulp.watch(path.sass, ['sass'])
	gulp.watch(path.build + '/base.css', ['minify-css'])
	gulp.watch(path.js, ['js'])
})