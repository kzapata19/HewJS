import { makeCharts, deleteCharts } from '../chartGenerator.js';
import React from 'react';

let data1 = [
  { "Word": 35, "Awesomeness":2000 },
  { "Word": 34, "Awesomeness":3000 }
];

let chart1 = {
  data: data1,
  xAxis: "Word",
  yAxis: "Awesomeness",
  type: "bar"
};

let chart2 = {
  data: data1,
  xAxis: "Word",
  yAxis: "Awesomeness",
  type: "scatter"
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    makeCharts([chart1], 800, 600);
  }

  componentDidUpdate() {
    deleteCharts();
    makeCharts([chart2], 800, 600);
  }

  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props.data)}</p>
        <p>{this.props.type}</p>
        <div className="chart">
        </div>
      </div>
    );
  }
};

module.exports = Chart;
