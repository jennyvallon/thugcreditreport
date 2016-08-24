var sign = require('../../app/controllers/sign.server.controller');var selfReportingForm = require('../../app/controllers/question.server.controller');var score = require('../../app/controllers/score.server.controller');var render = require('../../app/controllers/render.server.controller');var funct = require('../../app/controllers/functions.server.controller');var test = require('../../app/controllers/test.server.controller');var passport = require('passport');module.exports = function(app) {    app.route('/')         .get(render.landingPage)    ;        app.route('/dashboard')         .get(sign.in)//recreate session upon signin        .get(score.create)//only if need be        .get(score.createHighlight)        .get(score.update)        //score calculation controllers should be inserted here        .get(render.landingPage)       ;        app.route('/signup')        .get(render.signup)        .post(sign.up)        .post(selfReportingForm.create)    ;    app.route('/questions')       .get(render.questions)    ;     app.route('/signin')        .get(render.signin)        .post(passport.authenticate('local', {            successRedirect: '/dashboard',            failureRedirect: '/signin',            failureFlash: true        }))    ;    app.get('/signout', sign.out)    ;    app.get('/oauth/facebook', passport.authenticate('facebook', {        failureRedirect: '/signin'    }));    app.get('/oauth/facebook/callback', passport.authenticate('facebook',        {            failureRedirect: '/signin',            successRedirect: '/'        }))    ;    app.route('/userQuestions')            .get(selfReportingForm.retrieve)            .post(selfReportingForm.update)    ;    app.route('/simulator')            .get(render.simulator)    ;    app.route('/test/kill')            .get(test.kill)    ;};