import Dropzone from 'react-dropzone';

const Input = (props) => {

  let liveReload;

  const handleInput = (files) => {
    const context = props.context;
    const file = files[0];
    const read = new FileReader();
    read.onload = function(event) {
      $('#textArea').val(event.target.result);
      context.setState({
        input: event.target.result
        .split('\n')
        .filter(line => !!line)
        .map(line => line.split(',').map(element => element.trim()))
      });
    }
    read.readAsText(file);
  }

  const handleText = () => {
    let input = $('#textArea').val();
    if (input) {
      input = input
        .split('\n')
        .filter(line => !!line)
        .map(line => line.split(',').map(element => element.trim()));
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

  /*
    formats data into the required format:
    [[set1, ... data points ...],
     [set2, ... data points ...],
     ...
    ]
  */
  const transpose = (matrix) => {
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

  const transposeInput = () => {
    let input = $('#textArea').val();
    if (input) {
      input = input.split('\n').filter(line => !!line).map(line => line.split(',').map(element => element.trim()));
      input = transpose(input).map(row => row.join(',')).join('\n');
      $('#textArea').val(input);
      handleText();
    }
  }

  let textAreaStyle = {
    width: '1170px',
    height: '300px',
    borderRadius: '8px'
  }

  let dropzoneBorder = {
    border: 'none'
  }

  return (
    <div className="dataInput text-center">
      <Dropzone id="dropzone" onDrop={handleInput} disableClick={true} style={dropzoneBorder}>
        <textarea id="textArea" onChange={liveText} placeholder="paste or drop your CSV here!"
        style={textAreaStyle}></textarea>
      </Dropzone>
      <button onClick={transposeInput} className="transpose">Transpose</button>
    </div>
  );
};

module.exports = Input;