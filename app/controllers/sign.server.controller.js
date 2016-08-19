var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');
var passport = require('passport');
var funct= require('./functions.server.controller');





exports.out = function (req, res) {
    req.session.destroy(function(err) {
        if (err){
            console.log("ERROR");
            console.log(err);
        }
    });
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

exports.in=function(req,res,next){
    
    req.session.reload(function(err){
        if(err){
            return res.redirect('/signout');
        }
    
        else if(!req.session.user){

            User.findOne({//see if user has account oauth account in db
            _id:req.session.passport.user
            }, function (err, user) {
            if (err) {//if error with query
                return done(err);
            } else {//rebuild session

                req.session.user={};
                req.session.user.userName=user.userName;
                req.session.user.selfReportingForm=user.selfReportingForm;
                req.session.user.scores=user.scores ;
                next();
            }
            });     
        }
        else{next();};  
    });
};
//signin being handled by passport.authenticate method