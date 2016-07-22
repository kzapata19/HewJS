import $ from 'jquery';

const loadSet = function (chartName, callback){
  return $.ajax({
    url: '/api/datasets/' + chartName,
    method: 'GET'
  }).done(function(data){
    callback(null, data);
  }).error(function(err){
    callback(err, null);
  });
};

const saveSet = function (username, dataSet, chartName, callback){
  return $.ajax({
    url: '/api/datasets/' + chartName,
    method: 'POST',
    data: {
      'username': username,
      'dataSet': dataSet,
      'chartName': chartName
    }
  }).done(function(result){
    callback(null, result);
  }).error(function(err){
    callback(err, null);
  });
};
