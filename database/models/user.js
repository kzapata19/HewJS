//The users collection will tentatively consist of documents with time stamps:
//username: string
//password: string
let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: String,
  password: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
