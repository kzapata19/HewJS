import Team from './team.jsx'
import Footer from './footer.jsx'
import Jumbotron from './jumbotron.jsx';
import Choose from './choose.jsx';
import Chart from './chart.jsx';
import Input from './input.jsx';
import Data from './data.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'HewJS in React',
      input: '',
      choosers: ['xAxis', 'y0'],
      types: {},
      xAxis: '',
      yAxis: {},
      yCounter: 1
    };
  }

  makeNewY() {
    this.setState({
      yCounter: this.state.yCounter+1,
      choosers: this.state.choosers.concat('y'+this.state.yCounter.toString())
    });
  }

  assignType(e) {
    this.state.types[e.target.dataset.axis] = e.target.value;
    this.setState({types: this.state.types});
  }

  setAxes(e) {
    if (e.target.value !== "---choose-a-value---") {
      let axis;
      if (e.target.dataset.axis === 'xAxis') {
        axis = {}
        axis[e.target.dataset.axis] = e.target.value;
      } else {
        axis = {yAxis: this.state.yAxis}
        axis.yAxis[e.target.dataset.axis] = e.target.value;
      }
      this.setState(axis);
    }
  }

  /*
    formats data into the required format:
    [[set1, ... data points ...],
     [set2, ... data points ...],
     ...
    ]
  */
  transpose(matrix) {
    let result = [];
    for (let i = 0; i < matrix[0].length; i++) {
      let row = [];
      for (let j = 0; j < matrix.length; j++) {
        row.push(matrix[j][i])
      }
      result.push(row);
    }
    return result;
  }


  /*
    {
      name: [values...],
      name: [values...]…
    }
  */
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

  render() {
    return (
      <div>
        <div>
          <Jumbotron />
        </div>
        <div>
          <Input input={this.state.input} context={this} />
        </div>

        <button onClick={this.makeNewY.bind(this)}>Add more series</button>

        <Data rawData={this.formatter(this.state.input)} setAxes={this.setAxes.bind(this)} choosers={this.state.choosers}/>
        {this.state.choosers.map(chart => chart !== 'xAxis' ?
          <Choose chartType={chart} assignType={this.assignType.bind(this)} /> : false
        )}
        {this.state.input ? <Chart app={this.state} /> : false}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementsByClassName('app')[0]);

