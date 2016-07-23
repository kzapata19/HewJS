//The users collection will tentatively consist of documents with time stamps:
//username: string
//password: string
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
