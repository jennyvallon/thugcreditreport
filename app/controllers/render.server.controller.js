var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');
var passport = require('passport');
var funct= require('./functions.server.controller');




exports.questions=function(req,res,next){
    
    req.session.reload(function(err){//load users session
        
        var questions=JSON.parse(req.session.user.selfReportingForm);//need to do this to make it an array
        if(err){
            next(err);
        }
        else{
            res.render('questions',{
                questions:questions
            });
        }    
    }); 
};

exports.signin = function (req, res, next) {
    
    
    if (!req.user) {//if no one is logged in
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function (req, res, next) {
    if (!req.user) {//no one is logged in
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');//send user to dashboard
    }
};

exports.landingPage = function (req, res, next) {
    
    if (!req.user) {//if no one is logged in;
        res.render('home', {});
    } else if(!req.session.user || !req.session){
        res.redirect('/signout');
    }
    else  {//if user does exist
        
        res.render('dashboard',{
            thugScore:req.session.user.scores.thugScore,
            highlightedScore:req.session.user.scores.highlighted.score,
            highlightedText:req.session.user.scores.highlighted.text,
            highlightedSection:req.session.user.scores.highlighted.section
        }); 
       
    }
};





