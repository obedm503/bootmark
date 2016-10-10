var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gulpJsdoc2md = require('gulp-jsdoc-to-markdown'),
    paths = {
      bundlejs: [
				'./node_modules/es6-promise/dist/es6-promise.min.js',
				'./node_modules/whatwg-fetch/fetch.min.js',
				'./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/bootstrap/dist/js/bootstrap.min.js',
				'./node_modules/showdown/dist/showdown.min.js',
				'./node_modules/google-code-prettify/bin/prettify.min.js',
				'./node_modules/showdown-prettify/dist/showdown-prettify.min.js',
				'./dist/bootmark.min.js'
			],
      js: ['./src/bootmark.js'],
      css: ['./src/bootmark.css']
    };

gulp.task('default', ['js','css','fetch','bundle','docs']);
gulp.task('dist', ['bundle','css']);

gulp.task('docs', function () {
  return gulp.src('src/*.js')
    .pipe(concat('DOCS.md'))
    .pipe(gulpJsdoc2md({
			private:true
		}))
    .pipe(gulp.dest('./docs/'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
		.pipe(gulp.dest('./dist/'))
    .pipe(cleanCss())
    .pipe(rename('bootmark.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('js', function(){
  return gulp.src(paths.js)
		.pipe(gulp.dest('./dist/'))
    .pipe(uglify({output: {comments: /^!|@preserve|@license|@cc_on/i}}))
    .pipe(rename('bootmark.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('bundle', ['js','fetch'], function(){
  return gulp.src(paths.bundlejs)
    .pipe(concat('bootmark.bundle.min.js', { newLine: '\n\n' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['bundle']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('fetch', function(){
	return gulp.src('./node_modules/whatwg-fetch/fetch.js')
		.pipe(uglify())
    .pipe(rename('fetch.min.js'))
		.pipe(gulp.dest('./node_modules/whatwg-fetch/'));
});
