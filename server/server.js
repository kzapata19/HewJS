let express = require('express');
let partials = require('express-partials');
let serveStatic = require('serve-static');
let bodyParser = require('body-parser');
let app = express();

app.use(partials());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/../client'));

module.exports = app;
