let express = require('express');
let partials = require('express-partials');
let serveStatic = require('serve-static');
let bodyParser = require('body-parser');

let helpers = require('../routes/routeHelpers');

let app = express();

app.use(partials());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/../client'));

app.get('/api/users', function(req, res) {
  helpers.getAllUsers(function(err, users) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});

app.get('/api/datasets', function(req, res) {
  helpers.getAllDataSets(function(err, dataSets) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(dataSets);
    }
  });
});

app.get('/api/users/:username', function(req, res) {
  helpers.getUser(req.params.username, function(err, user) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(user);
    }
  });
});

app.get('/api/datasets/:chartName', function(req, res) {
  helpers.getDataSet(req.params.chartName, function(err, dataSet) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(dataSet);
    }
  });
});

app.post('/api/users', function(req, res) {
  helpers.addUser(req.body, function(err, result) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(req.body.username);
    }
  });
});

app.post('/api/datasets', function(req, res) {
  helpers.addDataSet(req.body, function(err, dataSet) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(req.body.chartName);
    }
  });
});

app.put('/api/users/:username', function(req, res) {
  res.status(200).send();
});

app.put('/api/datasets/:chartName', function(req, res) {
  res.status(200).send();
});

app.delete('/api/users/:username', function(req, res) {
  res.status(200).send();
});

app.delete('/api/datasets/:chartName', function(req, res) {
  res.status(200).send();
});

module.exports = app;
