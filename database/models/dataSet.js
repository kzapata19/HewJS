//The datasets collection will tentatively consist of documents with time stamps:
//chart: object
//chartName: string
//username: string
const mongoose = require('mongoose');

const dataSetSchema = mongoose.Schema({
  chart: Object,
  chartName: String,
  username: String
});

const DataSet = mongoose.model('DataSet', dataSetSchema);

module.exports = DataSet;
