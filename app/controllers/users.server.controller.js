var User = require('mongoose').model('User');

//create new user
exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        } 
        else {
            res.json(user);
        }
    }); 
};


//change user information
exports.update = function(req, res, next) {
     User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
      if (err) {
      return next(err);
    } else {
      res.json(user);
} });
};


//delete account
exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        } 
        else {
            res.json(req.user);
        } 
    });
};
