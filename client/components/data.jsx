const React = require('react');
const Dragula = require('react-dragula');
import Chart from './chart.jsx';

class Data extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.rawData);
    this.state = {
      x: [],
      y: []
    };
  }

  setAxes(e) {
    console.log('this is e', e);
    console.log('This is e target value', e.target.value)
    if (e.target.value !== "default") {
      let axis = {};
      axis[e.target.dataset.axis] = this.props.rawData[e.target.value];
      this.setState(axis);
    }
  }

  showIt() {
    console.log(this.state);
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <div>
        {
          Object.keys(this.state).map(axis =>
            <select onChange={this.setAxes.bind(this)} data-axis={axis}>
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