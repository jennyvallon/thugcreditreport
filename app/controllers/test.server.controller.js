var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');
var Score = require('mongoose').model('score');
var passport = require('passport');
var funct= require('./functions.server.controller');



exports.kill= function(req,res,next){
    User.remove({//see if user has account oauth account in db
        userName:"testTEST"
    }, function (err, user) {
        if(err){
            funct.printError(err);
            next(err);
        }else{
            res.send("TEST USER REMOVED");
        }
    });
    
    
};



