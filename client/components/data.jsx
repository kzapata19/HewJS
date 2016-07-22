import React from 'react';

// This component allows users to associate data with chart axes.
// It formats and passes on data along with the chosen options to
// the Chart component.

// Chart's required format
// {
//   dataset: [{ "key": value, "key2": value}],
//   x: "",
//   charts: [
//     {
//       y: "key",
//       type: "type"
//     }
//   ]
// }

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
