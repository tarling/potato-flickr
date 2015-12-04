var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace');

var src = "./src/";
var devPath = "./dev/";
var deployPath = "./deploy/";
var output;

var copyOptions = {
  base: src
}

gulp.task('default', ['set-deploy-path', 'rjs', 'convert-html', 'copy-partials', 'sass'], function() {
});

gulp.task('dev', ['set-dev-path', 'copy', 'sass', 'watch'], function() {
});

gulp.task('set-dev-path', function(){
  output = devPath;
});

gulp.task('set-deploy-path', function(){
  output = deployPath;
});

gulp.task('copy', ['copy-html', 'copy-js', 'copy-lib'], function() {
  
});

gulp.task('copy-html', function() {
  gulp.src([
      src + 'index.html'
      , src + 'partials/**.html'
    ], copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('copy-partials', function() {
  gulp.src(src + 'partials/**.html', copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('copy-js', function() {
  gulp.src(src + 'js/**/*', copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('copy-lib', function() {
  gulp.src(src + 'lib/**/*', copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('sass', function () {
  gulp.src(src + 'sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(output + 'css'));
});

gulp.task('watch', function () {
  gulp.watch(src + 'sass/**/*.scss', ['sass']);
  gulp.watch(src + 'js/**', ['copy-js']);
  gulp.watch(src + '**/*.html', ['copy-html']);
});

gulp.task('rjs', function() {
    rjs({
        name: 'main',
        baseUrl: src + 'js/',
        out: 'app.js',
        include: ['requireLib'],
        mainConfigFile: src + 'js/main.js'
    })
    .pipe(uglify({output:{ascii_only:true}}))
    .pipe(gulp.dest(output)); // pipe it to the output DIR
});

gulp.task('convert-html', function() {
  gulp.src(src + 'index.html')
    .pipe(htmlreplace({
      'app-js': 'app.js'
    }))
    .pipe(gulp.dest(output));
});