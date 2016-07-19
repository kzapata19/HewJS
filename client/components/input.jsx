const Dropzone = require('react-dropzone');

const Input = (props) => {

  let liveReload;

  const handleInput = (files) => {
    const context = props.context;
    const file = files[0];
    const read = new FileReader();
    read.onload = function(event) {
      $('#textArea').val(event.target.result);
      context.setState({
        input: event.target.result.split('\n').map(line => line.split(','))
      });
    }
    read.readAsText(file);
  }

  const handleText = () => {
    let input = $('#textArea').val();
    if (input) {
      input = input.split('\n').map(line => line.split(','));
      props.context.setState({
        input: input
      });
    }
  }

  const liveText = () => {
    clearTimeout(liveReload);
    liveReload = setTimeout(function() {
      handleText();
    }, 500);
  }

  return (
    <div>
      <Dropzone id="dropzone" onDrop={handleInput} disableClick={true}>
        <textarea id="textArea" onChange={liveText} placeholder="paste or drop your CSV here!"></textarea>
      </Dropzone>
      <p>{JSON.stringify(props.context.state.input)}</p>
    </div>
  );
};

module.exports = Input;