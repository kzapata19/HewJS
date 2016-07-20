const React = require('react');
const Dragula = require('react-dragula');

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props.rawData);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <select>
          {
            Object.keys(this.props.rawData).map(key =>
            <option value={key}>{key}</option>)
          }
        </select>
      </div>
    );
  }
}

module.exports = Data;


// {day: [mon, tues, wed, thur, fri, sat, sun], hours: [1,2,3,4,5,6,7] }