var sessionSecret='developmentSessionSecret';
var uid = require('uid');
var string= uid();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

module.exports = {
    db: 'mongodb://localhost/thugcreditreport',//connection to correct database for development env
    sessionSecret: sessionSecret,
    viewEngine:'ejs',
    sessionOptions: {  
        store: new FileStore(),
        saveUninitialized: false,
        resave: true,
        secret: sessionSecret,
        cookie: { secure: false },
        genid: function(req){return string;} 
    },
    facebook: {
        clientID: '1828202650799497',
        clientSecret: '2bfacf748f8606309a7bd9f12f60ac44',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    }
    
    
    
};