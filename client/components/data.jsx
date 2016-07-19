const React = require('react');
const dragula = require('react-dragula');

class Data extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.props = props;
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <p>{this.props.rawData}</p>
      </div>
    );
  }
}

module.exports = Data;