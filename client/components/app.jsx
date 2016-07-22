const Choose = require('./choose.jsx')
const Chart = require('./chart.jsx');
const Input = require('./input.jsx');
const Data = require('./data.jsx');
const React = require('react');
const ReactDOM = require('react-dom');

window.React = React;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'HewJS in React',
      input: '',
      choosers: ['xAxis', 'y0'],
      types: [],
      xAxis: '',
      yAxis: {},
      yCounter: 1
    };
  }

  makeNewY() {
    let copy = this.state.choosers.slice();
    copy.push('y'+this.state.yCounter.toString());
    this.state.yCounter++;
    this.state.types.length = this.state.yCounter;
    this.setState({choosers: copy});
  }

  assignType(e) {
    console.log('Assign Type:')
    const type = e.target.value;
    let copy = this.state.types.slice();
    let index = this.state.choosers.indexOf(e.target.dataset.axis) - 1
    copy[index] = type;
    console.log(copy);
    this.setState({types: copy});
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
          <h1>{JSON.stringify(this.state)}</h1>
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

