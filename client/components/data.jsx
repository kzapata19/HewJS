import React from 'react';
import Chart from './chart.jsx';

// This component allows users to associate data with chart axes.
// It formats and passes on data along with the chosen options to
// the Chart component.

// Chart's required format
// {
//   data: [{ "key": value, "key2": value}],
//   xAxis: "",
//   charts: [
//     {
//       yAxis: "key",
//       type: "type"
//     }
//   ]
// }

class Data extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.rawData);
    this.state = {
      xAxis: [],
      yAxis: []
    };
  }

  formatChartForProp() {
    let result = [];

  }

  formatDataForProp(input) {
    let result = [];
    let keys = Object.keys(input);
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
    let chartProp = {};
    chartProp.data = this.formatDataForProp(this.props.rawData);
    chartProp.xAxis = this.state.xAxis;
    chartProp.charts = [];
    return chartProp;
  }

  setAxes(e) {
    console.log('this is e target dataset axis ', e.target.dataset.axis);
    console.log('This is e target value ', e.target.value)
    if (e.target.value !== "---choose-a-value---") {
      let axis = {};
      axis[e.target.dataset.axis] = e.target.value;
      this.setState(axis);
    }
  }

  showIt() {
    console.log(this.formatPropForChart());
  }

  render() {
    return (
      <div>
        <div>
        {
          Object.keys(this.state).map(axis =>
            <select onChange={this.setAxes.bind(this)} data-axis={axis}>
              <option value="---choose-a-value---">choose a value</option>
              {
                Object.keys(this.props.rawData).map(key =>
                <option value={key}>{key}</option>)
              }
            </select>
            )
        }
          <button onClick={this.showIt.bind(this)}>Show it</button>
        </div>
        <div>
          <Chart data={this.state} type={this.props.choice}/>
        </div>
      </div>
    );
  }
}

module.exports = Data;


// {day: [mon, tues, wed, thur, fri, sat, sun], hours: [1,2,3,4,5,6,7] }