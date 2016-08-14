var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');
var passport = require('passport');
var funct= require('./functions.server.controller');





exports.out = function (req, res) {
    req.logout();
    res.redirect('/');
        
    
};

exports.up = function (req, res, next) {

    if (!req.user) {//if no one is logged in
        req.session.reload(function(err){
            if(err){
                next(err);
            }else{
                req.session.user=req.body;//create user info
                next();//populate questions
                
                   
            }
        });  
    } else {
        return res.redirect('/');
    }
};

//signin being handled by passport.authenticate method
