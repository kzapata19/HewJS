import React from 'react';
import Data from './data.jsx';

class Choose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choice: ""
    }
  }

  onChoice(event) {
    this.setState({
      choice: event.target.dataset.value
    });
  }

  render() {
    return (
      <div>
        <div data-value="bar" onClick={this.onChoice.bind(this)} >
          Bar
        </div>
        <div data-value="histogram" onClick={this.onChoice.bind(this)} >
          Histogram
        </div>
        <div data-value="line" onClick={this.onChoice.bind(this)} >
          Line
        </div>
        <div data-value="scatter" onClick={this.onChoice.bind(this)} >
          Scatter
        </div>
        <Data rawData={this.props.rawData} choice={this.state.choice}/>
      </div>
    )
  }

}

module.exports = Choose;