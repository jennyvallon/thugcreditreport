var sessionSecret='developmentSessionSecret';var uid = require('uid');var string= uid();var session = require('express-session');var FileStore = require('session-file-store')(session);module.exports = {    db: 'mongodb://localhost/thugcreditreport',//connection to correct database for development env    sessionSecret: sessionSecret,    sessionOptions: {          store: new FileStore(),        saveUninitialized: true,        resave: true,        secret: sessionSecret,        cookie: { secure: false },        genid: function(req){return string;}     }};