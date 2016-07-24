import $ from 'jquery';

const signup = function(username, password, callback) {
  return $.ajax({
    url: '/signup',
    method: 'POST',
    data: {
      'username': username,
      'password': password
    }
  }).done(function(result){
    callback(null, result);
  }).error(function(err){
    callback(err, null);
  });
};

const login = function(username, password, callback) {
  return $.ajax({
    url: '/login',
    method: 'POST',
    data: {
      'username': username,
      'password': password
    }
  }).done(function(result){
    callback(null, result);
  }).error(function(err){
    callback(err, null);
  });
};

const logout = function(callback) {
  return $.ajax({
    url: '/logout',
    method: 'GET'
  }).done(function(data){
    callback(null, data);
  }).error(function(err){
    callback(err, null);
  });
};

const saveDataSet = function(username, dataSet, chartName, callback) {
  return $.ajax({
    url: '/api/datasets/${username}',
    method: 'POST',
    data: {
      'username': username,
      'dataSet': dataSet,
      'chartName': chartName
    }
  }).done(function(result) {
    callback(null, result);
  }).error(function(err) {
    callback(err, null);
  });
};

const loadDataSet = function(username, chartName, callback) {
  return $.ajax({
    url: `/api/datasets/${username}/${chartName}`,
    method: 'GET'
  }).done(function(data){
    callback(null, data);
  }).error(function(err){
    callback(err, null);
  });
};

module.exports = { signup, login, logout, saveDataSet, loadDataSet };
