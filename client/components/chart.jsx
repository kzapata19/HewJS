import { makeCharts, deleteCharts } from '../chartGenerator.js';
import React from 'react';

let dataset = [
  { "Word": 35, "Awesomeness":2000 },
  { "Word": 34, "Awesomeness":3000 }
];

let data1 = {
  dataset: dataset,
  x: "Word",
  charts: [{ y: "Awesomeness", type: "bar" }, { y: "Awesomeness", type: "scatter" }]
};

let data2 = {
  dataset: dataset,
  x: "Awesomeness",
  charts: [{ y: "Word", type: "bar" }, { y: "Word", type: "scatter" }]
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  formatter(matrix) {
    let result = {};
    for (let i = 0; i < matrix.length; i++){
      for (let j = 0; j < matrix[i].length; j++){
        if (!j){
          result[matrix[i][j]] = [];
        }else{
          result[matrix[i][0]].push(matrix[i][j]);
        }
      }
    }
    return result;
  }

  formatChartForProp() {
    let result = [];
    let copy = this.props.app.choosers.slice(1);
    for (let series of copy) {
      let temp = {};
      temp.y = this.props.app[series];
      temp.type = this.props.app.types[this.props.app.choosers.indexOf(series)-1]
      result.push(temp);
    }
    return result;
  }

  formatDataForProp(input) {
    const result = [];
    const keys = Object.keys(input);
    for (let i = 0; i < input[keys[0]].length; i++) {
      let entry = {};
      for (let key of keys) {
        entry[key] = input[key][i];
      }
      result.push(entry);
    }
    return result;
  }

  formatPropForChart() {
    const chartProp = {};
    chartProp.dataset = this.formatDataForProp(this.formatter(this.props.app.input));
    chartProp.x = this.props.app.xAxis;
    chartProp.charts = this.formatChartForProp();
    return chartProp;
  }

  componentDidMount() {
    makeCharts(this.props.data, 800, 600);
    // makeCharts(data1, 800, 600);
  }

  componentDidUpdate() {
    deleteCharts();
    makeCharts(this.props.data, 800, 600);
    // makeCharts(data2, 800, 600);
  }

  render() {
    return (
      <div>
        <p>{JSON.stringify(this.formatPropForChart())}</p>
        <div className="chart">
        </div>
      </div>
    );
  }
};

module.exports = Chart;
