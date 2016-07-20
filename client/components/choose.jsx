import React from 'react'

class Choose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choice: ""
    }
  }

  onChoice(event) {
    console.log('This is event target', event.target);
    console.log('This is event target dataset value', event.target.dataset.value);
  }

  render() {
    return (
      <div>
        <div data-value="bar" onClick={this.onChoice} >
          Bar
        </div>
        <div data-value="histogram" onClick={this.onChoice} >
          Histogram
        </div>
        <div data-value="line" onClick={this.onChoice} >
          Line
        </div>
        <div data-value="scatter" onClick={this.onChoice} >
          Scatter
        </div>
      </div>
    )
  }

}

module.exports = Choose;