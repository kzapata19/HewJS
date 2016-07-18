let express = require('express');
let partials = require('express-partials');
let serveStatic = require('serve-static');
let bodyParser = require('body-parser');
let app = express();

app.use(partials());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/../client'));

app.get('/api/users', function(req, res) {
  res.status(200).send();
});

app.get('/api/datasets', function(req, res) {
  res.status(200).send();
});

app.get('/api/users/:username', function(req, res) {
  res.status(200).send();
});

app.get('/api/datasets/:chartName', function(req, res) {
  res.status(200).send();
});

app.post('/api/users', function(req, res) {
  res.status(201).send();
});

app.post('/api/datasets', function(req, res) {
  res.status(201).send();
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
