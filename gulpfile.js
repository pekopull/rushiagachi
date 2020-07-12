'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var notifier = require('node-notifier');

function NotifyPopup(title, msg) {
  notifier.notify({ title: title, message: msg});
}

sass.compiler = require('node-sass');

gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: './main_page',
      index: "landing_page.html"
    },
    notify: true
  });

  browserSync.watch('./main_page/landing_page.html').on('change', browserSync.reload);
  done();
});

gulp.task('sass', function(done) {
  var stream = gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', function(msg) { NotifyPopup('Gulp.js', `${msg.line}: ${msg.message}`); console.log(msg) }))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', function(msg) { NotifyPopup('Gulp.js', msg.message) }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./main_page/css'))
    .pipe(browserSync.reload({stream: true}));

  stream.on('end', function() {
    done();
  });
  
  stream.on('error', function(err) {
    NotifyPopup('Gulp.js', err);
    console.log(err)
    done(err);
  });

  return stream;
});

gulp.task('watch', gulp.series('sass', 'browser-sync', function(done) {
  gulp.watch('./src/scss/**/*.*', gulp.series('sass'));
  done();
}));
