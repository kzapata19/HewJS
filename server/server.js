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

// This GET route is used to get an array consisting
// of all the user objects (sans passwords)
app.get('/api/users', function(req, res) {
  routes.getAllUsers()
  .then(users => res.status(200).send(users))
  .catch(err => res.status(404).send(err));
});

// This GET route is used to get an array consisting
// of all of a user's saved data sets
app.get('/api/datasets/:username', auth.checkUser, function(req, res) {
  routes.getAllDataSets(req.params.username)
  .then(dataSets => res.status(200).send(dataSets))
  .catch(err => res.status(404).send(err));
});

// This GET route is used to get a user object (sans password)
app.get('/api/users/:username', auth.checkUser, function(req, res) {
  routes.getUser(req.params.username)
  .then(user => res.status(200).send(user))
  .catch(err => res.status(404).send(err));
});

// This GET route is used to get a data set with a specified name
// and associated username
app.get('/api/datasets/:username/:chartName', auth.checkUser, function(req, res) {
  routes.getDataSet(req.params.username, req.params.chartName)
  .then(dataSet => res.status(200).send(dataSet))
  .catch(err => res.status(404).send(err));
});

// This GET route logs out the current user from the client
app.get('/logout', function(req, res) {
  auth.destroySession(req, res);
});

// This POST route adds a new user object (username/password) to the database
app.post('/api/datasets/:username', auth.checkUser, function(req, res) {
  routes.addDataSet(req.body)
  .then(dataSet => res.status(201).send(req.body.chartName))
  .catch(err => res.status(404).send(err));
});

// This POST route signs up a new user object (username/password) and
// create a new session for them
app.post('/signup', function(req, res) {
  routes.getUser(req.body.username)
  .then(user => {
    if (!user) {
      routes.addUser({ username: req.body.username, password: req.body.password });
      auth.createSession(req, res, {
        username: req.body.username,
        password: req.body.password
      });
    } else {
      res.status(401).send(`User ${req.body.username} already exists`);
    }
  });
});

// This POST route creates a session for an existing user
app.post('/login', function(req, res) {
  auth.checkPassword(req.body.username, req.body.password)
  .then(matches => {
    if (!matches) {
      res.status(401).send('Incorrect login provided');
    } else {
      auth.createSession(req, res, {
        username: req.body.username,
        password: req.body.password
      });
    }
  });
});

// This PUT route updates a given user's password
app.put('/api/users/:username', auth.checkUser, function(req, res) {
  routes.updateUser(req.params.username, req.body.password)
  .then(user => res.status(200).send(`Changed password for ${req.params.username}`))
  .catch(err => res.status(404).send(err));
});

// This PUT route updates a given data set
app.put('/api/datasets/:username/:chartName', auth.checkUser, function(req, res) {
  routes.updateDataSet(req.params.username, req.params.chartName, req.body.chart)
  .then(dataSet => res.status(200).send(`Changed data for ${req.params.username}'s chart ${req.params.chartName}`))
  .catch(err =>res.status(404).send(err));
});

// This DELETE route deletes a given user
app.delete('/api/users/:username', auth.checkUser, function(req, res) {
  routes.deleteUser(req.params.username)
  .then(user => res.status(200).send(user))
  .catch(err => res.status(404).send(err));
});

// This DELETE route deletes a given data set
app.delete('/api/datasets/:username/:chartName', auth.checkUser, function(req, res) {
  routes.deleteDataSet(req.params.username, req.params.chartName)
  .then(dataSet => res.status(200).send(dataSet))
  .catch(err => res.status(404).send(err));
});

module.exports = app;
