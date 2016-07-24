const Promise = require('bluebird');
const compareHash = Promise.promisify(require('bcrypt-nodejs').compare);

const User = require('../database/models/user');

const isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.status(401).send('You must be logged in to access this resource');
  } else {
    next();
  }
};

exports.checkPassword = function(username, passwordGuess) {
  return User.findOne({ username: username })
  .exec()
  .then(user => compareHash(passwordGuess, user.password));
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    res.redirect('/');
  });
};

exports.destroySession = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/');
  });
};
