// import dimple from 'dimple-js';
let dimple = require('../node_modules/dimple-js/dist/dimple.latest.js');

let makeCharts = function(charts, height, width) {
  let svg = dimple.newSvg(".chart", height, width);

  // For each "chart" object,
    // "typify" the type...
    // add the category axis and measure axis...
    // add the series
    // draw
  charts.forEach((chart) => {
    let newChart = new dimple.chart(svg, chart.data);
    let newChartType = typify(chart.type);

    newChart.addCategoryAxis("x", chart.xAxis);
    newChart.addMeasureAxis("y", chart.yAxis);

    newChart.addSeries(null, newChartType);

    newChart.draw();
  });
};

let typify = function(typeString) {
  if (typeString === "bar") {
    return dimple.plot.bar;
  } else if (typeString === "histogram") {
    return dimple.plot.histogram;
  } else if (typeString === "line") {
    return dimple.plot.line;
  } else if (typeString === "scatter") {
    return dimple.plot.scatter;
  }
};

module.exports = makeCharts;
