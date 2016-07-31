var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');


//create new user
exports.create = function(req, res, next) {
    var user = new User(req.body);
    
    
    req.session.regenerate(function(err) {//start a new session
        user.save(function(err) {//create new user
            if (err) {
                return next(err);
            } 
            else {
                req.session.user=user;//save data to session. "user" represents user data as it would be in database
                
                req.session.save(function(err) {//save session
                    if (err) {
                        return next(err);
                    } 
                });
                res.end();
            }      
        });
    });
};




//populate selfReportingForm object directly from the db
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

exports.userQuestions=function(req,res,next){//give me users questions
    req.session.reload(function(err){
        var questions=JSON.parse(req.session.user.selfReportingForm);//need to do this to make it an array
        if(err){
            next(err);
        }
        else{
            res.json(questions);
        } 
    });
};


exports.updateUsersQuestions=function(req,res,next){
    req.session.reload(function(err){//access session
        var id=req.session.user._id;
        if(err){
            next(err);
        }
        else{
//            console.log(req.session);
            req.session.user.selfReportingForm=req.body.selfReportingForm;//update user session
            req.session.save(function(err) {//save session
                if (err) {
                    return next(err);
                } else{}
            }); 
//            console.log(req.body);
            var update={$set:req.body};
            var options={new: true};
            User.findByIdAndUpdate(id, update, options, function(err, result) {
                if (err) {
                    return next(err);
                } else {
                    res.end();
                }
            });
        }
    });

};

