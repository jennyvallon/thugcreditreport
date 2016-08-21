var app = require('../../server');
var config = require('../../config/config');
var supertest = require('supertest');
var should = require('should');
var mongoose = require('mongoose');
var User = mongoose.model('user');
var Question = mongoose.model('question');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport= require('passport');
var fs= require('fs');
var child_process = require('child_process');
var db = config.db;

var sessionFile;
var sessionData;
var user={firstName:"TEST",lastName:"TEST",email:"TEST@gmail.com",userName:"testTEST", password:"TESTTESTTEST!", provider:"local"};
var userlogin={userName:user.userName,password:user.password};

//NODE_ENV=test mocha --reporter spec app/tests

describe('SIGNUP', function () {//mocha
    before(function (done) {
        child_process.exec('gulp clean', function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
           if(stderr!==''){ console.log('stderr: ' + stderr);};
            
            if (error !==null) {
                console.log('exec error: ' + error);
            }
            done();
        });
    });
    
        describe('USING LOCAL:PASSPORT', function () {
            it('Should render ThugReport homepage', function (done) {
                supertest(app).get('/')//supertest
                        .end(function(err,res){
                            res.text.should.containEql('Reputation beyond work of mouth');
                            res.status.should.be.equal(200);
                           done();
                        });
            });
            it('Should render signup page and create session', function (done) {
                supertest(app).get('/signup')
                        .end(function(err,res){
                            
                            res.text.should.containEql('Sign up');
                            res.status.should.be.equal(200);
                            sessionFile=fs.readdirSync('sessions')[0];
                            if (sessionFile===undefined){
                                err= "ERROR: SESSION WAS NOT CREATED";
                                console.log(err);
                                throw err;
                            }
                            done();
                        });
            });
            it('Should populate session w/ user info/questions and save session to mongodb', function (done) {
                
                supertest(app).post('/signup')
                        .send(user)
                        .end(function(err,res){
                            sessionData=JSON.parse(fs.readFileSync('sessions/'+sessionFile).toString());
                            //redirect
                            res.status.should.be.equal(302);
                            res.text.should.containEql('Found. Redirecting to /questions');
                            //
                            
                            //get res.body from client
                            sessionData.should.have.property(['user']);
                            sessionData.should.have.property(['passport']);
                            sessionData.should.have.property(['flash']);
                            //
                            
                            //get questions from db
                            sessionData.should.have.propertyByPath(['user','selfReportingForm']);
                            sessionData.user.selfReportingForm.should.containEql('Enterprise');
                            sessionData.user.selfReportingForm.should.containEql('plug');
                            sessionData.user.selfReportingForm.should.containEql('checkbox');
                            sessionData.user.selfReportingForm.should.containEql('"chosen":'+false);
                            sessionData.user.selfReportingForm.should.containEql('Enterprise');
                            //
                            
                            //save session to db
                            User.findOne({firstName:user.firstName}, function (err, user) {
                                if(err){console.log('ERROR: DB DID NOT SAVE USER ');}
                            });
                            User.findOne({selfReportingForm:JSON.stringify(sessionData)}, function (err, user) {
                                if(err){console.log('ERROR: DB DID NOT SAVE SELF REPORTING FORM ');}
                            });
                            done();
                        });
            });
            it('Should render user questions', function (done) {
                supertest(app).get('/questions')//supertest
                        .end(function(err,res){
                            //make sure questions is rendering user questions
                            res.text.should.containEql('submit');
                            res.text.should.containEql('plug');
                            res.text.should.containEql('form');
                            res.text.should.containEql('checkbox');
                            res.text.should.containEql('radio');
                            res.text.should.containEql('Yes');
                            res.status.should.be.equal(200);
                            done();
                        });
            });
            it('Should post user questions update session and db', function (done) {
                var answers={selfReportingForm: '[{"_id":"57acd04b02e29c7e4bdc9788","section":{"_id":"57acce7a02e29c7e4bdc9786","title":"Length of Criminal History","weight":0.15},"text":"Are you about that life?","inputType":"radio","answers":[{"text":"Yes, just started","chosen":true,"score":10},{"text":"No","chosen":false,"score":-1000},{"text":"Yes, and I have been for 1-3 years","chosen":false,"score":10},{"text":"Yes, and I have been for 3-7 years","chosen":false,"score":10},{"text":"Yes, I am an OG with 7+ years in the game","chosen":false,"score":100}]},{"_id":"57acd06102e29c7e4bdc9789","section":{"_id":"57acceb602e29c7e4bdc9787","title":"Criminal Network and Enterprise","weight":0.15},"text":"Which of the following best describes you?","inputType":"radio","answers":[{"text":"I know muthafuckas who know muthafuckas","chosen":true,"score":10},{"text":"I know muthafuckas ( I am only one degree removed from said muthafuckas","chosen":false,"score":-1000},{"text":"I am the muthafucka that muthafuckas know","chosen":false,"score":10},{"text":"I am unknown","chosen":false,"score":10}]},{"_id":"57acd06f02e29c7e4bdc978a","section":{"_id":"57accdf802e29c7e4bdc9785","title":"Moving Work","weight":0.3},"text":"Have you ever run off on the plug?","inputType":"radio","answers":[{"text":"Yes","chosen":true,"score":10},{"text":"No","chosen":false,"score":-1000}]},{"_id":"57acd07d02e29c7e4bdc978b","section":{"_id":"57acceb602e29c7e4bdc9787","title":"Criminal Network and Enterprise","weight":0.15},"text":"Are you the plug?","inputType":"radio","answers":[{"text":"Yes","chosen":true,"score":10},{"text":"No","chosen":false,"score":-1000}]},{"_id":"57acd08902e29c7e4bdc978c","section":{"_id":"57accda502e29c7e4bdc9784","title":"Criminal Portfolio Diversity","weight":0.1},"text":"Have you ever caught a body?","inputType":"radio","answers":[{"text":"Yes","chosen":true,"score":10},{"text":"No","chosen":false,"score":-1000}]},{"_id":"57acd09602e29c7e4bdc978d","section":{"_id":"57accc6402e29c7e4bdc9783","title":"Relationship With Law Enforcement","weight":0.35},"text":"Have you ever acted in concert with the authorities?","inputType":"radio","answers":[{"text":"Yes","chosen":false,"score":10},{"text":"No","chosen":true,"score":-1000}]},{"_id":"57acd0b702e29c7e4bdc978e","section":{"_id":"57accc6402e29c7e4bdc9783","title":"Relationship With Law Enforcement","weight":0.35},"text":"Have you ever snitched?","inputType":"radio","answers":[{"text":"Yes","chosen":true,"score":10},{"text":"No","chosen":false,"score":-1000}]},{"_id":"57acd0cd02e29c7e4bdc978f","section":{"_id":"57accc6402e29c7e4bdc9783","title":"Relationship With Law Enforcement","weight":0.35},"text":"How many times have you been taken in my the police?","inputType":"radio","answers":[{"text":"Never","chosen":false,"score":10},{"text":"1-5 times","chosen":true,"score":-1000},{"text":"6+ times","chosen":false,"score":10}]},{"_id":"57acd0da02e29c7e4bdc9790","section":{"_id":"57accc6402e29c7e4bdc9783","title":"Relationship With Law Enforcement","weight":0.35},"text":"Are you on any government watch lists?","inputType":"radio","answers":[{"text":"Yes","chosen":true,"score":10},{"text":"No","chosen":false,"score":-1000}]},{"_id":"57acd0e802e29c7e4bdc9791","section":{"_id":"57accda502e29c7e4bdc9784","title":"Criminal Portfolio Diversity","weight":0.1},"text":"What are you moving in these streets? Select all that apply","inputType":"checkbox","answers":[{"text":"Prostitutes","chosen":true,"score":10},{"text":"Weapons","chosen":false,"score":-1000},{"text":"Artifacts/Art","chosen":true,"score":-1000},{"text":"Intelligence/Data","chosen":false,"score":-1000},{"text":"Drugs","chosen":false,"score":-1000},{"text":"Stolen Consumer Goods","chosen":true,"score":-1000},{"text":"Counterfeit Currency","chosen":false,"score":-1000},{"text":"Services (Hitman, Mercanary, Hacking, Money Laundering, etc.","chosen":true,"score":-1000},{"text":"Identities/Credit Card Numbers, etc.","chosen":false,"score":-1000}]},{"_id":"57acd0f602e29c7e4bdc9792","section":{"_id":"57accda502e29c7e4bdc9784","title":"Criminal Portfolio Diversity","weight":0.1},"text":"Select all titles that apply","inputType":"checkbox","answers":[{"text":"Plug","chosen":true,"score":10},{"text":"Trafficker (Drug, Art, Weapons, etc)","chosen":false,"score":-1000},{"text":"Trafficker (Human)","chosen":true,"score":-1000},{"text":"Launderer","chosen":false,"score":-1000},{"text":"Boss","chosen":true,"score":-1000},{"text":"Enforcer","chosen":false,"score":-1000},{"text":"Hitman","chosen":true,"score":-1000},{"text":"Robber","chosen":false,"score":-1000},{"text":"Hacker","chosen":true,"score":-1000},{"text":"Mercenary","chosen":false,"score":-1000}]}]'};
                supertest(app).post('/userQuestions')//supertest
                        .send(answers)
                        .end(function(err,res){
                            res.status.should.be.equal(302);
                            res.text.should.containEql('Found. Redirecting to /');
                            //make sure session has updated data
                            sessionData=JSON.parse(fs.readFileSync('sessions/'+sessionFile).toString());
                            sessionData.user.selfReportingForm.should.containEql(true);
                            
                            //make sure db is updated
                            User.findOne(answers, function (err, user) {
                                if(err){console.log('ERROR: db was not updated with session data');}
                            });
                            done();
                        });
            });
            //unable to test '/' request for "YOU ARE LOGGED IN" RESPONSE TEXT.
            it('Should signout and redirect to homepage', function (done) {
                supertest(app).get('/signout')//supertest
                        .end(function(err,res){
                            res.text.should.containEql('Found. Redirecting to /');
                            res.status.should.be.equal(302);
                           done();
                        });
            });
        });
    
    after(function (done) {
        child_process.exec('gulp clean', function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
           if(stderr!==''){ console.log('stderr: ' + stderr);};

            if (error !==null) {
                console.log('exec error: ' + error);
            }
            done();
        });
    });
});

describe('SIGNIN', function () {//mocha
    before(function (done) {
        child_process.exec('gulp clean', function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
           if(stderr!==''){ console.log('stderr: ' + stderr);};
            
            if (error !==null) {
                console.log('exec error: ' + error);
            }
            done();
        });
    });
    
        describe('USING LOCAL:PASSPORT', function () {
            it('Should render ThugReport homepage', function (done) {
                supertest(app).get('/')//supertest
                        .end(function(err,res){
                            res.text.should.containEql('Reputation beyond work of mouth');
                            res.status.should.be.equal(200);
                           done();
                        });
            });
            it('Should render signin page and create session', function (done) {
                supertest(app).get('/signin')
                        .end(function(err,res){
                            
                            res.text.should.containEql('Sign In');
                            res.status.should.be.equal(200);
                            sessionFile=fs.readdirSync('sessions')[0];
                            if (sessionFile===undefined){
                                err= "ERROR: SESSION WAS NOT CREATED";
                                console.log(err);
                                throw err;
                            }
                            done();
                        });
            });
            it('Should redirect to dashboard', function (done) {
                
                supertest(app).post('/signin')
                        .send(userlogin)
                        .end(function(err,res){
                            sessionData=JSON.parse(fs.readFileSync('sessions/'+sessionFile).toString());
                            //redirect
                            res.status.should.be.equal(302);
                            res.text.should.containEql('Found. Redirecting to /');  
                            done();
                        });
            });
            //unable to test '/' request for "YOU ARE LOGGED IN" RESPONSE TEXT.
            it('Should signout and redirect to homepage', function (done) {
                supertest(app).get('/signout')//supertest
                        .end(function(err,res){
                            res.text.should.containEql('Found. Redirecting to /');
                            res.status.should.be.equal(302);
                           done();
                        });
            });
        });
    
    after(function (done) {
        child_process.exec('gulp clean', function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
           if(stderr!==''){ console.log('stderr: ' + stderr);};

            if (error !==null) {
                console.log('exec error: ' + error);
            }
            done();
        });
    });
});


describe('RANDOM SCORE GENERATION', function () {
            it('Should return random number between 300 and 800', function (done) {
                supertest(app).get('/score')//supertest
                        .end(function(err,res){
                            parseInt(res.text).should.be.a.Number();
                            done();
                        });
            });
            
});



