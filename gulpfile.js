var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    minifyHTML = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    del = require('del');

var src = "./src/";
var devPath = "./dev/";
var deployPath = "./deploy/";
var output;

var copyOptions = {
  base: src
}

gulp.task('default', [
  'set-deploy-path'
  ,'clean'
  , 'rjs'
  , 'convert-html'
  , 'copy-partials'
  , 'compress-css'
  , 'copy-ie-js',
], function() {});

gulp.task('dev', [
  'set-dev-path'
  ,'clean'
  , 'copy'
  , 'sass'
  , 'watch'
], function() {});


gulp.task('set-dev-path', function(){
  output = devPath;
});

gulp.task('set-deploy-path', function(){
  output = deployPath;
});

gulp.task('clean', ['set-dev-path'], function(cb){
  del(output).then(function(paths){
    cb()
  });
});

gulp.task('copy', ['copy-html', 'copy-js', 'copy-lib'], function() {});

gulp.task('copy-html', ['clean'], function() {
  gulp.src([
      src + 'index.html'
      , src + 'partials/**.html'
    ], copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('copy-partials', ['clean'], function() {
  gulp.src(src + 'partials/**.html', copyOptions)
    .pipe(minifyHTML())
    .pipe(gulp.dest(output));
});

gulp.task('copy-js', ['clean'], function() {
  gulp.src(src + 'js/**/*', copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('copy-lib', ['clean'], function() {
  gulp.src(src + 'lib/**/*', copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('copy-ie-js', ['clean'], function() {
  gulp.src(src + 'lib/placeholders.min.js', copyOptions)
    .pipe(gulp.dest(output));
});

gulp.task('sass', ['clean'], function () {
  return gulp.src(src + 'sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(output + 'css'));
});

gulp.task('watch', ['clean'], function () {
  gulp.watch(src + 'sass/**/*.scss', ['sass']);
  gulp.watch(src + 'js/**', ['copy-js']);
  gulp.watch(src + '**/*.html', ['copy-html']);
});

gulp.task('rjs', ['clean'], function() {
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

gulp.task('convert-html', ['clean'], function() {
  gulp.src(src + 'index.html')
    .pipe(htmlreplace({
      'app-js': 'app.js'
    }))
    .pipe(minifyHTML({conditionals:false}))
    .pipe(gulp.dest(output));
});

gulp.task('compress-css', ['clean', 'sass'], function() {
  gulp.src(output + 'css/*.*')
    .pipe(minifyCss({advanced:false}))
    .pipe(gulp.dest(output + 'css/'));
});