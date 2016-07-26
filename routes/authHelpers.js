const Promise = require('bluebird');
const compareHash = Promise.promisify(require('bcrypt-nodejs').compare);

const User = require('../database/models/user');

// Input: A client request
// Output: Whether or not a client is logged in
// Side Effects: None
const isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

// Input: A client request, a server response, and a "next" callback
// Output: None
// Side Effects: If the client is logged in, pass to the next piece of
// middleware; otherwise, have the response send a 401
exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req) || req.params.username !== req.session.user.username) {
    res.status(401).send(`You must be logged in as ${req.params.username} to access this resource`);
  } else {
    next();
  }
};

// Input: A username and a guess for their password
// Output: A promise that resolves to "true" if the password is correct,
// and "false" otherwise
// Side Effects: None
exports.checkPassword = function(username, passwordGuess) {
  return User.findOne({ username: username })
  .exec()
  .then(user => user ? compareHash(passwordGuess, user.password) : false);
};

// Input: A client request, a server response, and a username/password pair
// Output: The result of creating a new session
// Side Effects: The client request receives a new session
exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    res.redirect('/');
  });
};

// Input: A client request and a server response
// Output: None
// Side Effects: Destroys the request's session
exports.destroySession = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/');
  });
};
