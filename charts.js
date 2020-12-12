function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("https://raw.githubusercontent.com/pratishthasingh1/bacteria_analysis/main/samples.json").then((metaData) => {
      var sampleNames = metaData.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];

      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);  
}

  
  // Demographics Panel
function buildMetadata(sample) {
  d3.json("https://raw.githubusercontent.com/pratishthasingh1/bacteria_analysis/main/samples.json").then((data) => {
    var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
  
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
      console.log(data);
  
      // Create a variable that holds the samples array.
      var samplesArray = data.samples;
      // Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = samplesArray.filter(f => f.id == sample);

      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
      //var selectedSample = resultArray.filter(f => f.id == sample);
      // Create a variable that holds the first sample in the array.
      var firstSample = resultArray[0]; 
  
      // Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = firstSample.otu_ids;
      var otu_labels = firstSample.otu_labels;
      var samples_values = firstSample.samples_values;
    //console.log(otu_ids)
    //console.log(otu_labels)
    //console.log(sample_values)

    // Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    // so the otu_ids with the most bacteria are last.
      // var top_ten = otu_ids.slice(0,10);
      // var top_ten_samples = samples_values.slice(0.10);
      var xticks = samples_values.slice(0,10).reverse();
      var yticks = otu_ids.slice(0,10).map(d => `otu${d}`).reverse();
      var hover_text = otu_labels.slice(0,10).reverse();
     
  
      // Create the trace for the bar chart.
      var barData = [{
        x: xticks,
        y: yticks,
        text: hover_text,
        type: "bar",
        orientation: "h",
        }];
    
    
// Create the layout for the bar chart.
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin:{ t: 25, l:150}
    };
  // Use Plotly to plot the data with the layout.
  Plotly.newPlot("bar", barData, barLayout);

  // Create the trace for the bubble chart.
  var bubbleData = [{
    x: otu_ids,
    y: samples_values,
    text: otu_labels,
    mode: "markers",
    type: "scatter",
    marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "YlGnBu"    
    }
  }];

  // Create the layout for the bubble chart.
  var bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    xaxis: {title: "OTU ID"},
    yaxis: {automargin:true},
    showlegend: false,
    height: 300,
    width: 900,
  };

  // D2: 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);


// Create a variable that filters the metadata array for the object with the desired sample number.
  var metadata_SelId = data.metadata.filter(data => data.id == sample);

// create a variable that holds the washing frequency.
    var washFreq = metadata_SelId[0].wfreq;


  // 4. Create the trace for the gauge chart.
  var gaugeData = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: washFreq,
    bar: {color: 'black'},
    bgcolor: "white",
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
    }
  ];

  // 5. Create the layout for the gauge chart.
  var gaugeLayout = {
    autosize: true,
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      xanchor: 'center',
      y: 0,
      yanchor: 'center',
      text: "The gauge displays your belly button weekly washing frequency",
      showarrow: false
    }]
  };


  // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
  };