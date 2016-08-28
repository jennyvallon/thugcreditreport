var exec = require('child_process').exec;
var beeper = require('beeper');//creates audible beep

exports.runCommand=function(command){
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  };
};

exports.onError=function(err){
    beeper();
    console.log(err);
};