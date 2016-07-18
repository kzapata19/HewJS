//The users collection will tentatively consist of documents with time stamps:
//username: string
//password: string
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
