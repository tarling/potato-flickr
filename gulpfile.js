var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    minifyHTML = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    del = require('del'),
    runSequence = require('run-sequence');

var src = "./src/";
var devPath = "./dev/";
var deployPath = "./deploy/";
var output;

var copyOptions = {
  base: src
}

gulp.task('default', function(callback) {
  runSequence('set-deploy-path',
            'clean',
            ['rjs'
              , 'convert-html'
              , 'copy-partials'
              , 'compress-css'
              , 'copy-ie-js'],
            callback);
});

gulp.task('dev', function(callback) {
  runSequence('set-dev-path',
            'clean',
            ['copy'
              , 'sass'
              , 'watch'],
            callback);
});

gulp.task('set-dev-path', function(){
  output = devPath;
});

gulp.task('set-deploy-path', function(){
  output = deployPath;
});

gulp.task('clean', function(){
  return del(output);
});

gulp.task('copy', ['copy-html', 'copy-js', 'copy-lib'], function() {});

gulp.task('copy-html', function() {
  gulp.src([
      src + 'index.html'
      , src + 'partials/**.html'
    ], copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('copy-partials', function() {
  gulp.src(src + 'partials/**.html', copyOptions)
    .pipe(minifyHTML())
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

gulp.task('copy-ie-js',  function() {
  gulp.src(src + 'lib/placeholders.min.js', copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('sass', function () {
  return gulp.src(src + 'sass/*.scss')
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
    .pipe(minifyHTML({conditionals:false}))
    .pipe(gulp.dest(output));
});

gulp.task('compress-css', ['sass'], function() {
  gulp.src(output + 'css/*.*')
    .pipe(minifyCss({advanced:false}))
    .pipe(gulp.dest(output + 'css/'));
});