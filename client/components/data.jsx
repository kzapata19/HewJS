const React = require('react');
const Dragula = require('react-dragula');

class Data extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.props = props;
    this.state = {
    };
  }

  dragulaDecorator(componentBackingInstance) {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  };

  render() {
    return (
      <div ref={this.dragulaDecorator} style={{color: 'blue'}}>
        <div>Swap me around</div>
        <div>Swap her around</div>
        <div>Swap him around</div>
        <div>Swap them around</div>
        <div>Swap us around</div>
        <div>Swap things around</div>
        <div>Swap everything around</div>
      </div>
    );
  }
}

module.exports = Data;