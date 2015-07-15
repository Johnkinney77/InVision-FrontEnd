var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('process-scripts', function () {
  return gulp.src(['./backbone/initialize/*.js', './backbone/data/*.js', './backbone/models/*.js', './backbone/views/*.js', './backbone/collections/*.js', './backbone/layout-views/*.js', './backbone/router/*.js'])
  .pipe(concat('main.js'))

  .pipe(gulp.dest('./public/js'))
});


gulp.task('sass', function () {
  console.log('watched')
  gulp.src('./sassfile.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', ['sass', 'process-scripts'], function () {
  gulp.watch(['./backbone/initialize/*.js', './backbone/data/*.js', './backbone/models/*.js', './backbone/views/*.js', './backbone/collections/*.js', './backbone/layout-views/*.js','./backbone/router/*.js'], ['process-scripts'])
  gulp.watch('./sassfile.scss', ['sass']);
});


gulp.task('default', function () {
  console.log('i have configured gulp file');
});