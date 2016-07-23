const express = require('express');
const partials = require('express-partials');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const session = require('express-session');

const auth = require('../routes/authHelpers');
const routes = require('../routes/routeHelpers');

const app = express();

app.use(partials());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/../client'));

app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/api/users', function(req, res) {
  routes.getAllUsers()
  .then(users => res.status(200).send(users))
  .catch(err => res.status(404).send(err));
});

app.get('/api/datasets', function(req, res) {
  routes.getAllDataSets()
  .then(dataSets => res.status(200).send(dataSets))
  .catch(err => res.status(404).send(err));
});

app.get('/api/users/:username', function(req, res) {
  routes.getUser(req.params.username)
  .then(user => res.status(200).send(user))
  .catch(err => res.status(404).send(err));
});

app.get('/api/datasets/:username/:chartName', function(req, res) {
  routes.getDataSet(req.params.username, req.params.chartName)
  .then(dataSet => res.status(200).send(dataSet))
  .catch(err => res.status(404).send(err));
});

app.post('/api/users', function(req, res) {
  routes.addUser(req.body)
  .then(user => res.status(201).send(req.body.username))
  .catch(err => res.status(404).send(err));
});

app.post('/api/datasets', function(req, res) {
  routes.addDataSet(req.body)
  .then(dataSet => res.status(201).send(req.body.chartName))
  .catch(err => res.status(404).send(err));
});

app.put('/api/users/:username', function(req, res) {
  routes.updateUser(
    req.params.username,
    { username: req.body.username, password: req.body.password }
  )
  .then(user => res.status(200).send(user))
  .catch(err => res.status(404).send(err));
});

app.put('/api/datasets/:username/:chartName', function(req, res) {
  routes.updateDataSet(
    req.params.username,
    req.params.chartName,
    { chart: req.body.char, chartName: req.body.chartName, username: req.body.username }
  )
  .then(dataSet => res.status(200).send(dataSet))
  .catch(err =>res.status(404).send(err));
});

app.delete('/api/users/:username', function(req, res) {
  routes.deleteUser(req.params.username)
  .then(user => res.status(200).send(user))
  .catch(err => res.status(404).send(err));
});

app.delete('/api/datasets/:username/:chartName', function(req, res) {
  routes.deleteDataSet(req.params.username, req.params.chartName)
  .then(dataSet => res.status(200).send(dataSet))
  .catch(err => res.status(404).send(err));
});

module.exports = app;
