const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
const options = { promiseLibrary: require('bluebird') };
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hewJSdb', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

module.exports = db;
