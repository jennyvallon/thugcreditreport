var sessionSecret='developmentSessionSecret';var uid = require('uid');var string= uid();module.exports = {    db: 'mongodb://localhost/thugcreditreport',//connection to correct database for development env    sessionSecret: sessionSecret,    sessionOptions: {          saveUninitialized: true,        resave: true,        secret: sessionSecret,        cookie: { secure: false },        genid: function(req){return string;}     }};