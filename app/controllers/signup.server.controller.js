var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');


//create new user
exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        } 
        else {
            res.end();
        }
    }); 
};



//retrieve questions json
exports.list = function(req, res, next) {
    Question.find().populate('section').exec(function(err, questions) {
        if (err) {
            return next(err);
        } else {
            res.locals.questions= questions;
            res.locals.selfReportingForm=questions;
//            console.log(res.locals.selfReportingForm);
            next();
        } 
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
exports.render=function(req,res,questions){

    res.render('questions',{
        questions:res.locals.questions
    });
};