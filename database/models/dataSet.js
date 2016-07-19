//The datasets collection will tentatively consist of documents with time stamps:
//chart: object
//chartName: string
//username: string
let mongoose = require('mongoose');

let dataSetSchema = mongoose.Schema({
  chart: Object,
  chartName: String,
  username: String
});

let DataSet = mongoose.model('DataSet', dataSetSchema);

module.exports = DataSet;
