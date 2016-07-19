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
      input: 'this is the data from the input field'
    };
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

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.message}</h1>
        </div>
        <div>
          <Input input={this.state.input} context={this} />
          <Chart context={this} />
        </div>
        <Data rawData={this.state.input} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementsByClassName('app')[0]);