const Promise = require('bluebird');
const cipher = Promise.promisify(require('bcrypt-nodejs').hash);

const db = require('../database/config');

const User = require('../database/models/user');
const DataSet = require('../database/models/dataSet');

// Input: None
// Output: A promise that resolves to an array of all the user objects (sans passwords)
// Side Effects: None
exports.getAllUsers = function() {
  return User.find({}, {'_id': 0, 'username': 1}).exec();
};

// Input: A username
// Output: A promise that resolves to an array of all the data sets a user has created
// Side Effects: None
exports.getAllDataSets = function(username) {
  return DataSet.find({'username': username}, {'_id': 0, 'chart': 1, 'chartName': 1, 'username': 1}).exec();
};

// Input: A username
// Output: A promise that resolves to a user's object (sans password)
// Side Effects: None
exports.getUser = function(username) {
  return User.findOne({'username': username}, {'_id': 0, 'username': 1}).exec();
};

// Input: A username and chart name
// Output: A promise that resolves to a data set object
// Side Effects: None
exports.getDataSet = function(username, chartName) {
  return DataSet.findOne({
    'username': username,
    'chartName': chartName
  }, {'_id': 0, 'chart': 1, 'chartName': 1, 'username': 1}).exec();
};

// Input: A user object (username/password)
// Output: A promise that resolves to the result of adding said user
// Side Effects: The user is added to the database
exports.addUser = function(user) {
  return cipher(user.password, null, null)
  .then(hashedPassword => User.create({
    username: user.username,
    password: hashedPassword
  }));
};

// Input: A data set object (chart/chartName/username)
// Output: A promise that resolves to the result of adding said chart
// Side Effects: The data set is added to the database
exports.addDataSet = function(dataSet) {
  return DataSet.create(dataSet);
};

// Input: A username and a new password for them
// Output: A promise that resolves to the result of updating said user
// Side Effects: The user's password is changed in the database
exports.updateUser = function(username, newPassword) {
  return cipher(newPassword, null, null)
  .then(hashedPassword => User.findOneAndUpdate({'username': username}, {'password' : hashedPassword}).exec());
};

// Input: A username, chart name, and data set object (chart/chartName/username)
// Output: A promise that resolves to the result of updating said data set
// Side Effects: "username"'s data set of name "chartName" is updated in the
// database
exports.updateDataSet = function(username, chartName, newChart) {
  return DataSet.findOneAndUpdate({'username': username, 'chartName': chartName}, {'chart': newChart}).exec();
};

// Input: A username
// Output: A promise that resolves to the username that was deleted
// Side Effects: The user with username "username" is delete from the database
exports.deleteUser = function(username) {
  return User.remove({'username': username}).exec().then(() => username);
};

// Input: A username and chart name
// Output: A promise that resolves to the chart name that was deleted
// Side Effects: The data set with name "chartName" created by "username" is deleted from the database
exports.deleteDataSet = function(username, chartName) {
  return DataSet.remove({'username': username, 'chartName': chartName}).exec().then(() => chartName);
};
