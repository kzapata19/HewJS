//The datasets collection will tentatively consist of documents with time stamps:
//chart: object
//username: string
var mongoose = require('mongoose');

var dataSetSchema = mongoose.Schema({
  chart: Object,
  username: String
});

var DataSet = mongoose.model('DataSet', dataSetSchema);

module.exports = DataSet;
