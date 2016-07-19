const Chart = require('./chart.jsx');
const Input = require('./input.jsx');
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementsByClassName('app')[0]);