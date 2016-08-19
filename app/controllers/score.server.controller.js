var User = require('mongoose').model('user');
var Question = require('mongoose').model('question');
var Score = require('mongoose').model('score');
var passport = require('passport');
var funct= require('./functions.server.controller');

exports.create=function(req,res,next){
    if(!req.session.user.scores){
        var thugScore=funct.getScore(300,800);//overall Score
        var section1score=funct.getScore(300,thugScore);
        var section2score=funct.getScore(300,thugScore);
        var section3score=funct.getScore(300,thugScore);
        var section4score=funct.getScore(300,thugScore);
        var section5score=funct.getScore(300,thugScore);
        var highlightedScore=funct.getScore(thugScore,800);
    //    console.log(req.session.user);


        req.session.user.scores={};
        req.session.user.scores.highlighted={};
        req.session.user.scores.thugScore=thugScore;
        req.session.user.scores.section1score=section1score;
        req.session.user.scores.section2score=section2score;
        req.session.user.scores.section3score=section3score;
        req.session.user.scores.section4score=section4score;
        req.session.user.scores.section5score=section5score; 
        req.session.user.scores.highlighted.score=highlightedScore; 
    }
//    console.log(req.session.user);
    next();
};



exports.update=function(req,res,next){
    var id=req.session.passport.user;
    
//    console.log(req.session.user);
    
    var update={$set:{scores:req.session.user.scores}};
    var options={new: true};
    User.findByIdAndUpdate(id, update, options, function(err) {
    if (err) {
        console.log("ERROR");
        console.log(err);
        return next(err);
    } 
    else {next();}
    });
        
    
    
};

exports.createHighlight=function(req,res,next){
    var sectionArray=[{title:"Relationship With Law Enforcement"},{title:"Criminal Portfolio Diversity"},{title:"Moving Work"},{title:"Length of Criminal History"},{title:"Criminal Network and Enterprise"}];
    var sess=req.session.user.scores;
    var scoreArray=new Array(sess.section1score,sess.section2score,sess.section3score,sess.section4score,sess.section5score);
    var lowestScore=Math.min(sess.section1score,sess.section2score,sess.section3score,sess.section4score,sess.section5score);
    var i=(scoreArray.indexOf(lowestScore));
    var response;

    Score.find().populate('section').exec(function(err, result) {
        if (err) {
            funct.printError();
            return next(err);
        } else {
            var array=(result[i].rank);
            req.session.user.scores.highlighted.text=funct.returnHighlightedScoreText(array,lowestScore);
            req.session.user.scores.highlighted.section=result[i].section.title;
            next();
        }
    });        
};




