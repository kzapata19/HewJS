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
        <p>{JSON.stringify(this.props.data)}</p>
        <p>{this.props.type}</p>
        <div className="chart">
        </div>
      </div>
    );
  }
};

module.exports = Chart;
