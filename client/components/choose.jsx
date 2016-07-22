import React from 'react';

// This component handles chart type selection for each data series.
// The association is stored as an array ``types'' on the state of the App component,
// where types[index] is associated with choosers[index+1]

const Choose = (props) => {

  return (
    <div>
      <select data-axis={props.chartType} onChange={props.assignType}>
        <option value="null">
          choose a chart type
        </option>
        <option value="bar">
          Bar
        </option>
        <option value="histogram">
          Histogram
        </option>
        <option value="line">
          Line
        </option>
        <option value="scatter">
          Scatter
        </option>
      </select>
    </div>
  );
}

module.exports = Choose;
