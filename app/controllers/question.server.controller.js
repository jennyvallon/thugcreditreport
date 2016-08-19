var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');
var passport = require('passport');
var funct= require('./functions.server.controller');


exports.update=function(req,res,next){
    //client==>server==>session==>db==>end()
    req.session.reload(function(err){//access session
        var id=req.session.passport.user;
        if(err){
            console.log("ERROR");
            console.log(err);
            next(err);
        }
        else{
            req.session.user.selfReportingForm=req.body.selfReportingForm;//update user session

            var update={$set:{selfReportingForm:req.session.user.selfReportingForm}};
            var options={new: true};
            User.findByIdAndUpdate(id, update, options, function(err) {
                if (err) {
                    console.log("ERROR");
                    console.log(err);
                    return next(err);
                } 
                else {return res.redirect('/dashboard');}
            });
        }
    });

};

exports.create = function(req, res, next) { 
    //db==>session==>user.save().db===>login==>redirect /questions
    Question.find().populate('section').exec(function(err, questions) {
        if (err) {
            return next(err);
        } else {
           req.session.user.selfReportingForm=JSON.stringify(questions);
           
            req.session.save(function(){
                if(err){
                   console.log("ERROR");
                   console.log(err);
                   next(err);
                }
                var user = new User(req.session.user);
                var message = null;
                user.provider = 'local';
                user.save(function (err) {
                    if (err) {
                        var message = funct.getErrorMessage(err);
                        req.flash('error', message);
                        console.log(err);
                        return res.redirect('/signup');
                    }else{
                        req.login(user, function (err) {
                            if (err){
                                return next(err);
                            } 
                            return res.redirect('/questions');
                        });           
                    }   
                });
           });
        }  
    }); 
};

exports.retrieve=function(req,res, next){
    //session==>client
    req.session.reload(function(err){
        if(err){
            next(err);
        }
        res.send(req.session.user.selfReportingForm);
    });
};


//question.create.session
//question.retrieve.session
//question.update.session
//question.delete.session