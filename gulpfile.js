var gulp = require('gulp'),
    sass = require('gulp-sass');

var src = "./src/";
var devPath = "./dev/";
var copyOptions = {
  base: src
}

gulp.task('default', ['copy', 'sass', 'watch'], function() {
  // place code for your default task here
});

gulp.task('copy', ['copy-html', 'copy-js', 'copy-lib'], function() {
  
});

gulp.task('copy-html', function() {
  gulp.src(['./src/index.html', './src/partials/**.html'], copyOptions)
    .pipe(gulp.dest(devPath));
});

gulp.task('copy-js', function() {
  gulp.src('./src/js/**/*', copyOptions)
    .pipe(gulp.dest(devPath));
});

gulp.task('copy-lib', function() {
  gulp.src('./src/lib/**/*', copyOptions)
    .pipe(gulp.dest(devPath));
});

gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(devPath + 'css'));
});

gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/js/**', ['copy-js']);
  gulp.watch('./src/**/*.html', ['copy-html']);
});