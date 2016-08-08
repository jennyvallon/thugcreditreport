var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('user');
    
module.exports = function(req,res,next) {
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({
            userName: username
        },  function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {//if user does't exist
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid password'
                    }); 
                }
                return done(null, user);
            }
        ); 
    }));
};