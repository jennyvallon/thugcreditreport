var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');//concatonate code into a single file
var myth = require('gulp-myth'); //css preprocessor
var uglify = require('gulp-uglify');//minifier
var jshint = require('gulp-jshint'); //check js code for any errors that will stop it from running properly
var imagemin = require('gulp-imagemin');//image minifier
var connect = require('connect');//middleware that allows us to build additional functionality into our gulp-task
var serve = require('serve-static');//static server
var browsersync = require('browser-sync'); //server instance that can sync browser and mobile windows
var browserify = require('browserify'); //allows all of our js not just our node js to use the common js specification that makes modular js possible 
var source = require('vinyl-source-stream'); //converts node streams to gulp streams
var plumber = require('gulp-plumber'); //stops watch task from crashing and logs error information to the console
var beeper = require('beeper');//creates audible beep
var del = require('del');//cleaner
var config = require('./gulpfile/config.js');//external config file used to implement more control over builds
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var funct = require('./gulpfile/functions.server.gulpfile');


//got solution from shell script solution from:
//http://stackoverflow.com/a/28048696/46810

//clean gulp tasks will make testing the server easier because cleaning 
//the user collection and session folder are now automated
gulp.task('clean-db', funct.runCommand('mongo 208.82.115.80:27017/thugcreditreport gulpfile/cleandb.js'));
gulp.task('clean-sessions', function () {
    del(['sessions/*']);
});

gulp.task('styles', function () {
    return gulp.src(config.sass.source)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sass())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.sass.dest));
});

gulp.task('scripts', function () {
    return gulp.src(config.js.source)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));          
});


gulp.task('start', function () {
  nodemon(config.nodemon.options);
});

gulp.task('clean', gulp.parallel('clean-db', 'clean-sessions'));
gulp.task('default', gulp.series('styles', 'scripts', 'start'));
   