const express = require('express');
const partials = require('express-partials');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const helpers = require('../routes/routeHelpers');

const app = express();

app.use(partials());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/../client'));

app.get('/api/users', function(req, res) {
  helpers.getAllUsers()
  .then(users => res.status(200).send(users))
  .catch(err => res.status(404).send(err));
});

app.get('/api/datasets', function(req, res) {
  helpers.getAllDataSets()
  .then(dataSets => res.status(200).send(dataSets))
  .catch(err => res.status(404).send(err));
});

app.get('/api/users/:username', function(req, res) {
  helpers.getUser(req.params.username)
  .then(user => res.status(200).send(user))
  .catch(err => res.status(404).send(err));
});

app.get('/api/datasets/:chartName', function(req, res) {
  helpers.getDataSet(req.params.chartName)
  .then(dataSet => res.status(200).send(dataSet))
  .catch(err => res.status(404).send(err));
});

app.post('/api/users', function(req, res) {
  helpers.addUser(req.body)
  .then(user => res.status(201).send(req.body.username))
  .catch(err => res.status(404).send(err));
});

app.post('/api/datasets', function(req, res) {
  helpers.addDataSet(req.body)
  .then(dataSet => res.status(201).send(req.body.chartName))
  .catch(err => res.status(404).send(err));
});

app.put('/api/users/:username', function(req, res) {
  helpers.updateUser(
    req.params.username,
    { username: req.body.username, password: req.body.password }
  )
  .then(user => res.status(200).send(user))
  .catch(err => res.status(404).send(err));
});

app.put('/api/datasets/:chartName', function(req, res) {
  helpers.updateDataSet(
    req.params.chartName,
    { chart: req.body.char, chartName: req.body.chartName, username: req.body.username }
  )
  .then(dataSet => res.status(200).send(dataSet))
  .catch(err =>res.status(404).send(err));
});

app.delete('/api/users/:username', function(req, res) {
  helpers.deleteUser(req.params.username)
  .then(user => res.status(200).send(user))
  .catch(err => res.status(404).send(err));
});

app.delete('/api/datasets/:chartName', function(req, res) {
  helpers.deleteDataSet(req.params.chartName)
  .then(dataSet => res.status(200).send(dataSet))
  .catch(err => res.status(404).send(err));
});

module.exports = app;
