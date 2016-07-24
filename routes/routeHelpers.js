const db = require('../database/config');

const User = require('../database/models/user');
const DataSet = require('../database/models/dataSet');

exports.getAllUsers = function() {
  return User.find({}, {'_id': 0, 'username': 1}).exec();
};

exports.getAllDataSets = function() {
  return DataSet.find({}, {'_id': 0, 'chart': 1, 'chartName': 1, 'username': 1}).exec();
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
  return User.create(user);
};

exports.addDataSet = function(dataSet) {
  return DataSet.create(dataSet);
};

exports.updateUser = function(username, newProperties) {
  return User.findOneAndUpdate({'username': username}, newProperties).exec();
};

exports.updateDataSet = function(username, chartName, newProperties) {
  return DataSet.findOneAndUpdate({'username': username, 'chartName': chartName}, newProperties).exec();
};

exports.deleteUser = function(username) {
  return User.remove({'username': username}).exec().then(() => username);
};

exports.deleteDataSet = function(username, chartName) {
  return DataSet.remove({'username': username, 'chartName': chartName}).exec().then(() => chartName);
};
