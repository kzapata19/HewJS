const Promise = require('bluebird');
const cipher = Promise.promisify(require('bcrypt-nodejs').hash);

const db = require('../database/config');

const User = require('../database/models/user');
const DataSet = require('../database/models/dataSet');

exports.getAllUsers = function() {
  return User.find({}, {'_id': 0, 'username': 1}).exec();
};

exports.getAllDataSets = function(username) {
  return DataSet.find({'username': username}, {'_id': 0, 'chart': 1, 'chartName': 1, 'username': 1}).exec();
};

exports.getUser = function(username) {
  return User.findOne({'username': username}, {'_id': 0, 'username': 1}).exec();
};

exports.getDataSet = function(username, chartName) {
  return DataSet.findOne({
    'username': username,
    'chartName': chartName
  }, {'_id': 0, 'chart': 1, 'chartName': 1, 'username': 1}).exec();
};

exports.addUser = function(user) {
  return cipher(user.password, null, null)
  .then(hashedPassword => User.create({
    username: user.username,
    password: hashedPassword
  }));
};

exports.addDataSet = function(dataSet) {
  return DataSet.create(dataSet);
};

exports.updateUser = function(username, newPassword) {
  return cipher(newPassword, null, null)
  .then(hashedPassword => User.findOneAndUpdate({'username': username}, {'password' : hashedPassword}).exec());
};

exports.updateDataSet = function(username, chartName, newChart) {
  return DataSet.findOneAndUpdate({'username': username, 'chartName': chartName}, {'chart': newChart}).exec();
};

exports.deleteUser = function(username) {
  return User.remove({'username': username}).exec().then(() => username);
};

exports.deleteDataSet = function(username, chartName) {
  return DataSet.remove({'username': username, 'chartName': chartName}).exec().then(() => chartName);
};
