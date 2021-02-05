function buildMetadata(sample) {

    // Build the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
    var url = "/metadata/" + sample;
    d3.json(url).then(function(sample){
  
      // Use d3 to select the panel with id of `#sample-metadata`
      var sample_metadata = d3.select("#sample-metadata");
  
      // Use `.html("")` to clear any existing metadata
      sample_metadata.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Inside the loop, use d3 to append new tags for each key-value
      // in the metadata.
      Object.entries(sample).forEach(([key, value]) => {
        var row = sample_metadata.append("p");
        row.text(`${key}: ${value}`);
  
      })  //ends the Object.entries(sample).forEach...
    }) //ends the section for d3.json(url.then(function(data) 
  };  //ends the function buildMetadata(sample)

  function buildBarChart(sample) {
     // Use `d3.json` to fetch the sample data for the bar chart
     var url = `/samples/${sample}`;
     d3.json(url).then(function(data) { 
      var ybar = data.otu_ids;
      var xbar = data.sample_values;
      var barHover = data.otu_labels;

        // Build a Bar Chart using the sample data
        var trace1 = {
          y: ybar.slice(0, 10).map(object => `OTU ${object}`).reverse(),
          x: xbar.slice(0, 10).reverse(),
          hovertext: barHover.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h"
        }
          var data = [trace1];
          
        // Apply the group bar mode to the layout
        var layout = {
            title: "Top 10 OTUs",
            margin: {
              b: 100,
              l: 100,
              r: 100,
              t: 100,
            }  //ends the margin
          };  //ends the layout
          
          // Render the plot to the div tag with id "plot"
          Plotly.newPlot("plot", data, layout);
  });  //ends the section for d3.json(url.then(function(data) 
  } //ends the function buildBarChart(sample)
  
  // Build the gauge chart
  function buildGaugeChart(sample) {
    
     // Use `d3.json` to fetch the metadata
     var url = `/metadata/${sample}`;
     d3.json(url).then(function(data) {
        //console.log(data);  - used to make sure I was getting the data I wanted
        var freqValues = data.WFREQ;
        //console.log(freqValues);  used to check the value
      var data = [
        {
          type: "indicator",
          mode: "gauge+number",
          value: freqValues,
          title: { text: "Belly Button Washing Frequency</b> <br> Scrubs per Week", font: { size: 18 } },
          gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" }, // Max value is 9
            bar: { color: "black" },  // Color of the bar (black) that indicates the washing frequency value
            bgcolor: "black",
            borderwidth: 2,
            bordercolor: "black",
            // Set the colors for the different ranges on the gauge
            steps: [
              { range: [0, 1], color: "lightcoral" },
              { range: [1, 2], color: "lightpink" },
              { range: [2, 3], color: "yellowgreen" },
              { range: [3, 4], color: "lightgreen" },
              { range: [4, 5], color: "green" },
              { range: [5, 6], color: "lightblue" },
              { range: [6, 7], color: "cyan" },
              { range: [7, 8], color: "royalblue" },
              { range: [8, 9], color: "blue" }
            ],  //ends the steps: section
          }  //ends the gauge: section
        }  //ends the curly brace after var data [
        
      ];  //ends the bracket with var data [
      
      var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial" }
      };  //ends the layout
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    //plot
    Plotly.newPlot("gauge", data, layout);
    });  // ends d3.json(url).then(function(data)
  }  //ends the function buildGaugeChart(sample)

  // Build the bubble chart
  function buildCharts(sample) {
  
    // Use `d3.json` to fetch the sample data for the plots
    var url = `/samples/${sample}`;
    d3.json(url).then(function(data) {
  
      // Build a Bubble Chart using the sample data
      var xValues = data.otu_ids;
      var yValues = data.sample_values;
      var tValues = data.otu_labels;
      var mSize = data.sample_values;
      var mClrs = data.otu_ids;
  
      var trace_bubble = {
        x: xValues,
        y: yValues,
        text: tValues,
        mode: 'markers',
        marker: {
          size: mSize,
          color: mClrs
        }  //ends marker:
      };  //ends trace_bubble
  
      var data = [trace_bubble];
  
      var layout = {
        xaxis: {title: "OTU ID"}
      }; //ends the layout
  
      Plotly.newPlot('bubble', data, layout);
  
    });  //ends the d3.json(url).then(function(data)
  }  //ends the function buildCharts(sample)
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      }); //ends the sampleNames.forEach...
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildBarChart(firstSample);
      buildGaugeChart(firstSample);
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });  //ends the d3.json("/names").then((sampleNames)
  };  //ends the function(init()
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildBarChart(newSample);
    buildGaugeChart(newSample);
    buildCharts(newSample);
    buildMetadata(newSample);

  }; //ends the function(optionChanged(newSample)
  
  // Initialize the dashboard
  init();