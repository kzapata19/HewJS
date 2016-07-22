import React from 'react';

// This component allows users to associate data with chart axes.
// The association is stored as a state on the App component.

const Data = (props) => {

  return (
    <div>
      <div>
      {
        props.choosers.map(axis =>
          <select onChange={props.setAxes} data-axis={axis}>
            <option value="---choose-a-value---">choose a value</option>
            {
              Object.keys(props.rawData).map(key =>
              <option value={key}>{key}</option>)
            }
          </select>
        )
      }
      </div>
    </div>
  );

}

module.exports = Data;
