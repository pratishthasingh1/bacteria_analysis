
var trace1 = {
  y: ["OTU 1167", "OTU 2859", "OTU 482", "OTU 2264",
      "OTU 41", "OTU 1189", "OTU 352", "OTU 189"],
  x: [163, 126, 113, 78, 71, 51, 50, 47],
  type: "bar",
  orientation: "h"
};

  
  var data = [trace1];
  
// Apply the group bar mode to the layout
var layout = {
    title: "Sample for Belly Button Diversity",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
  
  