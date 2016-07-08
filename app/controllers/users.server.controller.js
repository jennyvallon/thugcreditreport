var User = require('mongoose').model('user');

//create new user
exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        } 
        else {
            console.log(user);
            res.end();
        }
    }); 
};




//list of all users - testing purposes only
exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        } 
        else {
            res.json(users);
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
