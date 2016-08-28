var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    //gulpJsdoc2md = require('gulp-jsdoc-to-markdown'),
    paths = {
      bundlejs: ['./vendor/*.js','./dist/bootmark.min.js'],
      bundlecss: ['./vendor/*.min.css','./dist/bootmark.min.css'],
      js: ['./src/bootmark.js'],
      css: ['./src/bootmark.css']
    };

gulp.task('default', ['js','css','bundlejs','bundlecss']);

/* for the future
gulp.task('docs', function () {
  return gulp.src('src/*.js')
    .pipe(concat('DOCS.md'))
    .pipe(gulpJsdoc2md())
    .pipe(gulp.dest('./'));
});*/

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(cleanCss())
    .pipe(rename('bootmark.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('js', function(){
  return gulp.src(paths.js)
    .pipe(uglify({output: {comments: /^!|@preserve|@license|@cc_on/i}}))
    .pipe(rename('bootmark.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('bundlejs', function(){
  return gulp.src(paths.bundlejs)
    .pipe(concat('bootmark.bundle.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('bundlecss', function() {
  return gulp.src(paths.bundlecss)
    .pipe(concat('bootmark.bundle.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
});
