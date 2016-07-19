let db = require('../database/config');

let User = require('../database/models/user');
let DataSet = require('../database/models/dataSet');

exports.getAllUsers = function(callback) {
  User.find({}, {'_id': 0, 'username': 1, 'password': 1}, function(err, users) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
};

exports.getAllDataSets = function(callback) {
  DataSet.find({}, {'_id': 0, 'chart': 1, 'chartName': 1, 'username': 1}, function(err, dataSets) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, dataSets);
    }
  });
};

exports.getUser = function(username, callback) {
  User.findOne({'username': username}, {'_id': 0, 'username': 1, 'password': 1}, function(err, user) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
};

exports.getDataSet = function(chartName, callback) {
  DataSet.findOne({'chartName': chartName}, {'_id': 0, 'chart': 1, 'chartName': 1, 'username': 1}, function(err, dataSet) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, dataSet);
    }
  });
};

exports.addUser = function(user, callback) {
  User.create(user, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

exports.addDataSet = function(dataSet, callback) {
  DataSet.create(dataSet, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
