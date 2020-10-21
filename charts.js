function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {d3.json("https://raw.githubusercontent.com/pratishthasingh1/bacteria_analysis/main/samples.json").then((data) => {
    console.log("___________________")
    console.log(data)
    console.log("______________________")
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
  
  }
  
  // Demographics Panel
  function buildMetadata(sample) {
    d3.json("https://raw.githubusercontent.com/pratishthasingh1/bacteria_analysis/main/samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var rArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var selection = rArray[0];
  
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  // Create the buildChart function.
  function buildCharts(sample) {
    // Use d3.json to load the samples.json file
    d3.json("https://raw.githubusercontent.com/pratishthasingh1/bacteria_analysis/main/samples.json").then((data) => {
  
      // Create a variable that holds the samples array.
    var sampleArray = data.samples;
      // Create a variable that filters the samples for the object with the desired sample number.
    var rArray = sampleArray.filter(sampleObj => sampleObj.id == sample);

      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var desiredSample = metadata.filter(sampleObj => sampleObj.id == sample);
      // Create a variable that holds the first sample in the array.
    var result = rArray[0];
  
      // 2. Create a variable that holds the first sample in the metadata array.
    var firstSample = desiredSample[0];
  
      // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    //console.log(otu_ids)
    //console.log(otu_labels)
    //console.log(sample_values)

  
      // 3. Create a variable that holds the washing frequency.
    var washFreq = firstSample.washFreq
    //console.log(washFreq)
  
      // Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order
      // so the otu_ids with the most bacteria are last.
      var top10 = (data.samples[0].otu_ids.slice(0,10)).reverse();
      var yticks = top10.map(d => "OTU" + d);
      var xticks = data.samples[0].sample_values.slice(0,10).reverse();
  
      // Create the trace for the bar chart.
      var trace_bar = {
        x: xticks,
        y: yticks,
        text: otu_labels,
        marker: {
            color: 'blue' },
        type: "bar",
        orientation: "h",
        };

        var barData = [trace_bar];
  
      ];
      // Create the layout for the bar chart.
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        yaxis: {title: "OTU ID}
      };
  
      // Use Plotly to plot the data with the layout.
      Plotly.react("bar",barData, barLayout);
      // Create the trace for the bubble chart.
      var trace_bubble = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        type: "scatter"
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "YlGnBu",
        },

        var bubbleData = [trace_bubble]

  
      // Create the layout for the bubble chart.
      var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {title: "OTU ID"},
        showgrid: true,
        paper_bgcolor: 'rgba(0,0,0,0)'
        plot_bgcolor: 'rgba(0,0,0,0)'
        height: 300,
        width: 900,
      },
  
      // D2: 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble",bubbleData, bubbleLayout)
  
      // 4. Create the trace for the gauge chart.
      var trace_gauge = [
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        bar: {color: 'black'}
        bgcolor: "white"
        gauge: {
          axis: {range : [null,10],tickwidth:1},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" }]
        },
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number"
        var gaugeData = [trace_gauge]
      ];
  
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = {
        width: 400, 
        height: 600, 
        margin: { t: 5, b: 5, l: 5, r: 5}
        paper_bgcolor: "rgba(0,0,0,0)",
        font: {color: "black"} 
      };
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData, gaugeLayout)
    });
  }
  