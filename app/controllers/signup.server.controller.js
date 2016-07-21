var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


//create new user
exports.create = function(req, res, next) {
    var user = new User(req.body);
    
    req.session.regenerate(function(err) {
        user.save(function(err) {
            if (err) {
                return next(err);
            } 
            else {
                req.session.user=user;
                req.session.save(function(err) {
                    if (err) {
                        return next(err);
                    } 
                });
                res.end();
            }      
        });
    });
};




//used to send most update questions to the new user
exports.list2 = function(req, res, questions) {
    Question.find().populate('section').exec(function(err, questions) {
        if (err) {
            return next(err);
        } else {
           res.json(questions); 
        } 
    });
};

//render questions as survey
exports.render=function(req,res,next){
    req.session.reload(function(err){
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



