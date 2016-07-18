const Dropzone = require('react-dropzone');

const Input = (props) => {

  return (
    <div>
     <Dropzone onDrop={props.handler}>
         <div>Drop some files here!</div>
     </Dropzone>
      <p>{props.input}</p>
    </div>
  );
};

module.exports = Input;