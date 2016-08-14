var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');
var passport = require('passport');
var funct= require('./functions.server.controller');

exports.getRandom=function(req,res,next){
    var score=funct.getScore(300,800);
//    req.session.reload(function(err){
//        if(err){
//            next(err);
//        }
//        req.session.user.score=score;
//        
//    });
    res.send(score.toString());
    console.log(score);
};


