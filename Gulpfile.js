'use strict';

var gulp = require('gulp');
var coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src('./*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('./*.coffee', ['coffee']);
});

gulp.task('default', function() {
  gulp.start('coffee');
});
