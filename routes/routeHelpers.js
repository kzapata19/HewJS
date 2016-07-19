let _ = require('underscore');

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

exports.updateUser = function(username, newProperties, callback) {
  User.findOneAndUpdate({'username': username}, newProperties, function(err, user) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
};

exports.updateDataSet = function(chartName, newProperties, callback) {
  DataSet.findOneAndUpdate({'chartName': chartName}, newProperties, function(err, dataSet) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, dataSet);
    }
  });
};

exports.deleteUser = function(username, callback) {
  User.remove({'username': username}, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, username);
    }
  });
};

exports.deleteChart = function(chartName, callback) {
  DataSet.remove({'chartName': chartName}, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, chartName);
    }
  });
};
