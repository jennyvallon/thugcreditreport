var gulp = require('gulp');
var exec = require('child_process').exec;
var del= require('del');

function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  };
}

//got this solution from:
//http://stackoverflow.com/a/28048696/46810

//these gulp tasks will make testing the server easier because cleaning 
//the user collection and session folder are now automated
gulp.task('clean-db', runCommand('mongo 208.82.115.80:27017/thugcreditreport gulpfile/cleandb.js'));
gulp.task('clean-sessions', function (cb) { del(['sessions/*']);cb;});
//app start and watch are being handled by nodemon --nodemon server.js in CLI

gulp.task('clean', gulp.parallel('clean-db', 'clean-sessions'));
  