// Create the tile layer that will be the background of our map
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 16,
  id: "light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var base = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark,
  Base: base
};

// Initialize all of the LayerGroups we'll be using
var layers = {
  PUBLIC: new L.LayerGroup(),
  PRIVATE: new L.LayerGroup()
  //PRIVATE_NONPROFIT: new L.LayerGroup(),
  //PRIVATE_FORPROFIT: new L.LayerGroup()
};

// var maxBounds = [
//   [5.499550, -167.276413], //Southwest
//   [83.162102, -52.233040]  //Northeast
// ];



// Create the map with our layers
var map = L.map("map-id", {
  center: [39.8, -98.5],
  //setView:[39.8, -98.5]
  zoom: 4,
  layers: [
    layers.PUBLIC,
    layers.PRIVATE
    //layers.PRIVATE_NONPROFIT,
    //layers.PRIVATE_FORPROFIT
  ]
});
// map.setMaxBounds(maxBounds);
// map.fitBounds(maxBounds);

// Add our 'lightmap' tile layer to the map
base.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "PUBLIC": layers.PUBLIC,
  "PRIVATE": layers.PRIVATE
 // "PRIVATE NON-PROFIT": layers.PRIVATE_NONPROFIT,
 // "PRIVATE FOR-PROFIT": layers.PRIVATE_FORPROFIT
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(baseMaps).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  PUBLIC: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue",
    shape: "penta"
  }),
  PRIVATE: L.ExtraMarkers.icon({
    icon: "ion-plus-circled",
    iconColor: "white",
    markerColor: "green",
    shape: "penta"
  }),

};




// Perform an API call to the Citi Bike Station Information endpoint
d3.json("static/data/top_college_final_latlon_json.json", function(data) {

  
    


  //var type=document.getElementById("type");
  //console.log(type);
  var type=[];
  var state=[];
  for(var i=0;i<data.length;i++){
    //var properties=data[i].properties;
    var t=data[i].properties['Public/Private'];
    type.push(t);
    //var type=data[i].properties.map(entry=>entry['Public/Private']);
    //console.log(t);
    var s=data[i].properties.State;
    state.push(s);
    //var uniqueCountry=[...new Set(dupCountry)];

  }
  console.log(state);
  // adding values for type in html
  var type_f=[...new Set(type)];
  console.log(type_f);
  var html_type=document.getElementById("type");
  for (var i=0;i<type_f.length; i++){
    //var selstate=d3.select("#state");
    // creating checkbox element 
    var checkbox = document.createElement('input'); 
    //var type_div=document.getElementById("type");
    console.log(checkbox);

            
    // Assigning the attributes 
    // to created checkbox 
    checkbox.type = "checkbox"; 
    checkbox.name = "type"; 
    checkbox.value = type_f[i]; 
    checkbox.id = "id"; 
      
    // creating label for checkbox 
    var label = document.createElement('label'); 
      
    // assigning attributes for  
    // the created label tag  
    label.htmlFor = "id"; 
      
    // appending the created text to  
    // the created label tag  
    label.appendChild(document.createTextNode(type_f[i])); 
    linebreak = document.createElement("br");
      
    // appending the checkbox 
    // and label to div 
    html_type.appendChild(checkbox); 
    html_type.appendChild(label);
    html_type.appendChild(linebreak);
    
  }
  // adding event listner when a checkbox from type is checked
var checkboxes_t = document.querySelectorAll("input[type=checkbox][name=type]");
var enabledType = [];
// Use Array.forEach to add an event listener to each checkbox.
checkboxes_t.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    enabledType = Array.from(checkboxes_t) // Convert checkboxes to an array to use filter and map.
                            .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                            .map(i => i.value); // Use Array.map to extract only the checkbox values from the array of objects.
  
  console.log(enabledType);

})
});


  


  // adding values for state in html
  var state_f=[...new Set(state)];
  state_f.sort();
  console.log(state_f);

  // selection the state div from html
  var html_state=document.getElementById("state");
  //var countryhtml=d3.select("#country");
    for (var i=0;i<state_f.length; i++){
      //var selstate=d3.select("#state");
      // creating checkbox element 
      var checkbox = document.createElement('input'); 
              
      // Assigning the attributes 
      // to created checkbox 
      checkbox.type = "checkbox"; 
      checkbox.name = "state"; 
      checkbox.value = state_f[i]; 
      checkbox.id = "id"; 
        
      // creating label for checkbox 
      var label = document.createElement('label'); 
        
      // assigning attributes for  
      // the created label tag  
      label.htmlFor = "id"; 
        
      // appending the created text to  
      // the created label tag  
      label.appendChild(document.createTextNode(state_f[i])); 
      linebreak = document.createElement("br");
        
      // appending the checkbox 
      // and label to div 
      html_state.appendChild(checkbox); 
      html_state.appendChild(label);
      html_state.appendChild(linebreak);
      //html_state.appendChild('<br>');  
    }


  // adding event listner when a checkbox from state is checked
    var checkboxes = document.querySelectorAll("input[type=checkbox][name=state]");
    var enabledSettings = [];
    // Use Array.forEach to add an event listener to each checkbox.
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        enabledSettings = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                                .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                                .map(i => i.value); // Use Array.map to extract only the checkbox values from the array of objects.
      
      console.log(enabledSettings)
    
  })
});




  
  console.log(data.length);
  console.log(data[0].geometry);


  // Create an object to keep of the number of markers in each layer
  var typeCount = {
    PUBLIC: 0,
     PRIVATE: 0
     // PRIVATE_NONPROFIT: 0,
     // PRIVATE_FORPROFIT: 0
    };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
  var typeCode;

  
   for (var i = 0; i < data.length; i++) {
      
    var geometry=data[i].geometry;
     var properties=data[i].properties;
     var type=data[i].properties['Public/Private']
     //console.log(type);
      
     if (type == 'Public') {
      typeCode = "PUBLIC";
    }
    else {
      typeCode = "PRIVATE";
      }
      

      
    typeCount[typeCode]++;
      // Create a new marker with the appropriate icon and coordinates
    var newMarker = L.marker([geometry.x, geometry.y], {
      icon: icons[typeCode]
    });
      //console.log(geometry.x);
      //console.log(layers[typeCode]);
      // Add the new marker to the appropriate layer
    newMarker.addTo(layers[typeCode]);
    

      //console.log(properties.Name);
      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
    var p=properties.Website;
    newMarker.bindPopup(properties.Name + "<br> City: " + properties.City +"<br> State: " + properties.State  + "<br> Website: <a href='https://"+properties.Website+"' "+"target='_blank'>" + properties.Website+"</a>");
      
  }
    
    
    

    d3.json("static/data/us-states.json",function(us_data){
      L.geoJson(us_data, {
        // Called on each feature
        onEachFeature: function(feature, layer) {
          // Set mouse events to change map styling
          layer.on({
            // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
              
            },
            // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
            mouseout: function(event) {
              
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.2
              })
            },
            // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
            click: function(event) {
              console.log(event.target);
              console.log(event);

              map.fitBounds(event.target.getBounds());

            }
          });


          // Giving each feature a pop-up with information pertinent to it
          layer.bindPopup("<h1>" + feature.properties.name + "</h1>");
          //console.log(document.getElementById(this.event));
        }
       
      }).addTo(map);
    });
      



    // Call the updateLegend function, which will... update the legend!
    updateLegend(typeCount);
    build_svgmap(enabledType,enabledSettings)
//     var button=d3.select("#form");
// console.log(button);
  var marker = new Array();
document.querySelector('button').onclick=function(){update()};
function update(){
  
  map.removeLayer(layers['PUBLIC']);
  map.removeLayer(layers['PRIVATE']);
  
  
  var mark=d3.select(".leaflet-marker-pane");
  mark.html("");


  if(marker.length != 0){
    for (var i=0;i<marker.length;i++){
    console.log(map.hasLayer);
    console.log(marker[0]);
    console.log(marker);
    map.removeLayer(marker[i]);
    //newMarkers.clearLayers();
  }

  }
 
  

  console.log(data.length);
  //console.log((enabledSettings).includes(data[0].properties.State));
  type_data=[];
  state_data=[];
  console.log(enabledType,data[0].properties.State);
  if(enabledType.length == 0){
    enabledType=["Public","Private"];

  }
  console.log(enabledType);

  for (var i=0;i<data.length;i++){
    //console.log(data[i].properties['Public/Private']);
    for (var j=0;j<enabledType.length;j++){
      //console.log(enabledType[j]);
      if(data[i].properties['Public/Private'] === enabledType[j]){
        //console.log(data[i]);

        type_data.push(data[i]);
      }
    }
  }
  console.log(type_data)
  // for(var j=0;j<enabledSettings.length;j++){
    
  //     var filteredData = data.filter(data => data.properties.State === enabledSettings);
  //     new_data.push(filteredData);
    
  // }
  console.log(enabledSettings);
  if(enabledSettings.length == 0){
    var state=[];
  for(var i=0;i<data.length;i++){
    //var properties=data[i].properties;
    // var t=data[i].properties['Public/Private'];
    // type.push(t);
    //var type=data[i].properties.map(entry=>entry['Public/Private']);
    //console.log(t);
    var s=data[i].properties.State;
    state.push(s);
    //var uniqueCountry=[...new Set(dupCountry)];

  }
  var state_f=[...new Set(state)];
  enabledSettings=state_f;

  }
  console.log(enabledSettings);

  for (var i=0;i<type_data.length;i++){
    for (var j=0;j<enabledSettings.length;j++){
      if(type_data[i].properties.State == enabledSettings[j]){
        state_data.push(type_data[i]);
      }
    }
  }
  console.log(state_data);


  // Create an object to keep of the number of markers in each layer
  var typeCount = {
    PUBLIC: 0,
     PRIVATE: 0
     // PRIVATE_NONPROFIT: 0,
     // PRIVATE_FORPROFIT: 0
    };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
  var typeCode;
  

console.log(layers);


    //var marker = new Array();
  
   for (var i = 0; i < state_data.length; i++) {
      
    var geometry=state_data[i].geometry;
     var properties=state_data[i].properties;
     var type_temp=state_data[i].properties['Public/Private'];
     console.log(type_temp);
      
     if (type_temp == 'Public') {
      typeCode = "PUBLIC";
    }
    else {
      typeCode = "PRIVATE";
      }
      
    
  

      
    typeCount[typeCode]++;
    console.log(typeCount);
      // Create a new marker with the appropriate icon and coordinates
    var newMarker = L.marker([geometry.x, geometry.y], {
      icon: icons[typeCode]
    });
      //console.log(geometry.x);
      //console.log(layers[typeCode]);
      // Add the new marker to the appropriate layer
    //newMarker.addTo(layers[typeCode]);
    marker.push(newMarker);
    map.addLayer(marker[i]);
    
    //map.addLayer(newMarker);
    //newMarker.addTo(map);
    

    console.log(marker);
    

      //console.log(properties.Name);
      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
    var p=properties.Website;
    newMarker.bindPopup(properties.Name + "<br> City: " + properties.City +"<br> State: " + properties.State + "<br> Website: <a href='https://"+properties.Website+"' "+"target='_blank'>" + properties.Website+"</a>");
      
  }
  //map.addLayer(layers['PUBLIC']);
  updateLegend(typeCount);
  console.log(enabledType,enabledSettings);

  build_svgmap(enabledType,enabledSettings);

}


  

// Update the legend's innerHTML 
function updateLegend(typeCount) {
  document.querySelector(".legend").innerHTML = [
    "<p class='public'>PUBLIC: " + typeCount.PUBLIC + "</p>",
    "<p class='private'>PRIVATE: " + typeCount.PRIVATE + "</p>"
    // "<p class='coming-soon'>PRIVATE NON-PROFIT: " + typeCount.PRIVATE_NONPROFIT + "</p>",
    // "<p class='empty'>PRIVATE FOR-PROFIT: " + typeCount.PRIVATE_FORPROFIT + "</p>"
  ].join("");
}

function build_svgmap(enabledType,enabledSettings) {
  console.log(enabledType,'\n',enabledSettings)

  

  // Clear if SVG is Not Empty
  d3.select("#the_SVG_ID").remove();
  
  
  
  
  var svgWidth = 1000;
  var svgHeight = 600;

  // Set SVG Margins
  var margin = {
    top: 20,
    right: 40,
    bottom: 90,
    left: 100
  };

  // Define Dimensions of the Chart Area
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // If SVG Area is not Empty When Browser Loads, Remove & Replace with a Resized Version of Chart

  var svgArea = d3.select("#svg1")
                  .append("svg")
                  .attr("id","the_SVG_ID")
                  .attr("width",svgWidth )
                  .attr("height", svgHeight);

  

  var chartGroup = svgArea.append("g")
                          .attr("transform",`translate(${margin.left}, ${margin.top})`)
                          .attr("class","svg-class");

  console.log(chartGroup);

  //Initial params
  var chosenXAxis='Acceptance Rate'
  var chosenYAxis = "SAT Upper";

  // create xscale and yscale
  function xScale(state_data, chosenXAxis){
    
    
    //create scale function for the chart
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(state_data, d => d[chosenXAxis]) ,
        d3.max(state_data, d => d[chosenXAxis])
      ])
      .range([0, width]);
      console.log(xLinearScale);
    return xLinearScale;
  }
  


  //yScale

  function yScale(state_data, chosenYAxis){
    console.log(enabledType);
    //var properties = svg_data.properties;
    //create scale function for the chart
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(state_data, d => d[chosenYAxis]) ,
        d3.max(state_data, d => d[chosenYAxis]) 
      ])
      .range([height, 0]);
    return yLinearScale;
  }
  // var sc=yScale(state_data,chosenYAxis);
  // console.log(sc);
  // Function for Updating xAxis Upon Click on Axis Label
function renderXAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
    console.log(xAxis);
  return xAxis;
}
// Function for Updating yAxis Upon Click on Axis Label
function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);
  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
    console.log(yAxis);
  return yAxis;
}

// Function for Updating Circles Group with a Transition to New Circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
  console.log(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis);

  circlesGroup.transition()
    .duration(1000)
    // .attr("cx", d => newXScale(d[chosenXAxis]))
    // .attr("cy",( d => newYScale(d[chosenYAxis])));
    .attr("cx", d => newXScale(d[chosenXAxis]))
    // .attr("cy", function (d) {
    //   console.log(d);
    //   coords = projection([d.longitude, d.latitude])
    //   return coords[1];
    // })
    .attr("cy", d => newYScale(d[chosenYAxis]));
    console.log(circlesGroup);
  return circlesGroup;
}

// Function for Updating Circles Group with New Tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
  console.log(state_data);

  if (chosenXAxis === "Acceptance Rate") {
    var xLabel = "Acceptance Rate";
  }
  else if (chosenXAxis == "Alumni Salary")  {
    var xLabel = "Alumni Salary";
  }
  
  if (chosenYAxis === "SAT Upper") {
    var yLabel = "SAT Score";
  }
  else if (chosenYAxis === "ACT Upper") {
    var yLabel = "ACT Score)";
  }
  else if (chosenYAxis === "Net Price") {
    var yLabel = "Net Price";
  }
  else if (chosenYAxis === "Student Population"){
    var yLabel = "Student Population";
  }

  // Initialize Tool Tip
  var toolTip = d3.tip()
    .attr("class", "tooltip d3-tip")
    .offset([90, 90])
    .html(function(d) {
      console.log(d);
      return (`<strong>${d.Name}<br>${d.State}</strong><br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
    });


    d3.select("#title").remove();
      chartGroup.append("text")
      .attr("id","title")
    .attr("x", width / 2 )
    .attr("y", 0)
    .style("text-anchor", "middle","strong")
    .text(xLabel +"   Vs    "+yLabel);


    // Create Circles Tooltip in the Chart
    circlesGroup.call(toolTip);
    // Create Event Listeners to Display and Hide the Circles Tooltip
    circlesGroup.on("mouseover", function(data) {/////////////////////////if not working replace data with state_data
      toolTip.show(data, this);
    })
    // onmouseout Event
    .on("mouseout", function(data) {
      toolTip.hide(data);
    });
  // Create Text Tooltip in the Chart
  //textGroup.call(toolTip);
  // Create Event Listeners to Display and Hide the Text Tooltip
  // textGroup.on("mouseover", function(data) {
  //   toolTip.show(data, this);
  // })
  //   // onmouseout Event
  //   .on("mouseout", function(data) {
  //     toolTip.hide(data);
  //   });
   return circlesGroup;
}


d3.csv("static/data/plotting.csv", function(plot_data)
//d3.csv("static/data/plotting.csv")
    //.then(function(plot_data)
{
  console.log(plot_data);
  plot_data.forEach(function(data){
    data['Net Price'] = +data['Net Price'];
    data['Student Population'] = +data['Student Population'];
    data['Total Annual Cost'] = +data['Total Annual Cost'];
    data['Alumni Salary'] = +data['Alumni Salary'];
    data['Acceptance Rate'] = +data['Acceptance Rate'];
    data['SAT Upper'] = +data['SAT Upper'];
    data['ACT Upper'] = +data['ACT Upper'];
    
  })
  console.log(plot_data);

var rank=[],name=[],city=[],state=[],sat_l=[],sat_u=[],act_l=[],act_u=[],stu_pop=[],alumni_sal=[],annual_cost=[];
var sat=[],act=[],accept_rate=[];
type_data=[];
state_data=[];
console.log(enabledType);
if(enabledType.length == 0){
  enabledType=["Public","Private"];

}
console.log(enabledType);

for (var i=0;i<plot_data.length;i++){

  for (var j=0;j<enabledType.length;j++){
    //console.log(enabledType[j]);
    if(plot_data[i]['Public/Private'] === enabledType[j]){
      //console.log(data[i]);

      type_data.push(plot_data[i]);
    }
  }
}
console.log(type_data)
// for(var j=0;j<enabledSettings.length;j++){
  
//     var filteredData = data.filter(data => data.properties.State === enabledSettings);
//     new_data.push(filteredData);
  
// }
console.log(enabledSettings);
if(enabledSettings.length == 0){
  var state=[];
for(var i=0;i<data.length;i++){
  //var properties=data[i].properties;
  // var t=data[i].properties['Public/Private'];
  // type.push(t);
  //var type=data[i].properties.map(entry=>entry['Public/Private']);
  //console.log(t);
  var s=data[i].properties.State;
  state.push(s);
  //var uniqueCountry=[...new Set(dupCountry)];

}
var state_f=[...new Set(state)];
enabledSettings=state_f;

}
console.log(enabledSettings);

for (var i=0;i<type_data.length;i++){
  for (var j=0;j<enabledSettings.length;j++){
    if(type_data[i].Code == enabledSettings[j]){
      state_data.push(type_data[i]);
    }
  }
}
console.log(state_data);

// Create xLinearScale & yLinearScale Functions for the Chart
var xLinearScale = xScale(state_data, chosenXAxis);
console.log(xLinearScale);
//console.log(xLinearScale);
var yLinearScale = yScale(state_data, chosenYAxis);
console.log(yLinearScale);



// Create Axis Functions for the Chart
var bottomAxis = d3.axisBottom(xLinearScale);
console.log(bottomAxis);

var leftAxis = d3.axisLeft(yLinearScale);
console.log(leftAxis);


// Append xAxis to the Chart
var xAxis = chartGroup.append("g")
.classed("x-axis", true)
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);
console.log(xAxis);


// Append yAxis to the Chart
var yAxis = chartGroup.append("g")
.classed("y-axis", true)
.call(leftAxis);
console.log(yAxis);
console.log(state_data);


// Create & Append Initial Circles
var circlesGroup = chartGroup.selectAll(".stateCircle")
.data(state_data,console.log(state_data))
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d[chosenXAxis]))
// .attr("cy", function (state_data) {
//   console.log(state_data);
//   //coords = projection([d.longitude, d.latitude])
//   return yLinearScale(state_data[chosenYAxis]);
// })
.attr("cy", d => yLinearScale(d[chosenYAxis]))
.attr("class", "stateCircle")
.attr("r", 5)
.attr("opacity", ".75");


// Create Group for 2 xAxis Labels
var xLabelsGroup = chartGroup.append("g")
.attr("transform", `translate(${width / 2}, ${height + 20})`);
// Append xAxis
var acceptanceLabel = xLabelsGroup.append("text")
.attr("x", 0)
.attr("y", 20)
.attr("value", "AccepTance Rate") // Value to Grab for Event Listener
.classed("active", true)
.text("Acceptance Rate");

var alumni_salLabel = xLabelsGroup.append("text")
.attr("x", 0)
.attr("y", 40)
.attr("value", "Alumni Salary") // Value to Grab for Event Listener
.classed("inactive", true)
.text("Alumni Salary");



// Create Group for 4 yAxis Labels
var yLabelsGroup = chartGroup.append("g")
.attr("transform", `translate(-25, ${height / 2})`);
// Append yAxis
var satLabel = yLabelsGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -20)
.attr("x", 0)
.attr("value", "SAT Upper")
.attr("dy", "1em")
.classed("axis-text", true)
.classed("active", true)
.text("SAT Score");

var actLabel = yLabelsGroup.append("text") 
.attr("transform", "rotate(-90)")
.attr("y", -40)
.attr("x", 0)
.attr("value", "ACT Upper")
.attr("dy", "1em")
.classed("axis-text", true)
.classed("inactive", true)
.text("ACT Score");

var net_priceLabel = yLabelsGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -60)
.attr("x", 0)
.attr("value", "Net Price")
.attr("dy", "1em")
.classed("axis-text", true)
.classed("inactive", true)
.text("Net Price");

var stu_popuLabel = yLabelsGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -80)
.attr("x", 0)
.attr("value", "Student Population")
.attr("dy", "1em")
.classed("axis-text", true)
.classed("inactive", true)
.text("Student Population");
console.log(stu_popuLabel);

// updateToolTip Function
var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
console.log(circlesGroup);


// xAxis Labels Event Listener
console.log(xLabelsGroup);
xLabelsGroup.selectAll("text")
.on("click", function() {
  console.log("heyyyyyyyyyyyyyyy");
  // Get Value of Selection
  var value = d3.select(this).attr("value");
  
  console.log(value);
  if (value !== chosenXAxis) {
    // Replaces chosenXAxis with Value
    chosenXAxis = value;
    // Updates xScale for New Data
    xLinearScale = xScale(state_data, chosenXAxis);
    // Updates xAxis with Transition
    xAxis = renderXAxes(xLinearScale, xAxis);
    // Updates Circles with New Values
    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
    
    // Updates Tooltips with New Information
    circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
    // Changes Classes to Change Bold Text
    if (chosenXAxis === "Acceptance Rate") {
      acceptanceLabel
        .classed("active", true)
        .classed("inactive", false);
        alumni_salLabel
        .classed("active", false)
        .classed("inactive", true);
      
    }
    else {
      acceptanceLabel
        .classed("active", false)
        .classed("inactive", true);
        alumni_salLabel
        .classed("active", true)
        .classed("inactive", false);
    }
  }
});

// yAxis Labels Event Listener
console.log(yLabelsGroup);
yLabelsGroup.selectAll("text")
.on("click", function() {
  // Get Value of Selection
  var value = d3.select(this).attr("value");
  if (value !== chosenYAxis) {
    // Replaces chosenYAxis with Value
    chosenYAxis = value;
    // Updates yScale for New Data
    yLinearScale = yScale(state_data, chosenYAxis);
    // Updates yAxis with Transition
    yAxis = renderYAxes(yLinearScale, yAxis);
    // Updates Circles with New Values
    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
    
    // Updates Tooltips with New Information
    circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
    // Changes Classes to Change Bold Text
    if (chosenYAxis === "SAT Upper") {
      satLabel
        .classed("active", true)
        .classed("inactive", false);
      actLabel
        .classed("active", false)
        .classed("inactive", true);
      net_priceLabel
        .classed("active", false)
        .classed("inactive", true);
      stu_popuLabel
        .classed("active", false)
        .classed("inactive", true);
    }
    else if (chosenYAxis === "actLabel") {
      satLabel
        .classed("active", false)
        .classed("inactive", true);
      actLabel
        .classed("active", true)
        .classed("inactive", false);
      net_priceLabel
        .classed("active", false)
        .classed("inactive", true);
      stu_popuLabel
        .classed("active", false)
        .classed("inactive", true);
    }
    else if (chosenYAxis === "net_priceLabel") {
      satLabel
        .classed("active", false)
        .classed("inactive", true);
      actLabel
        .classed("active", false)
        .classed("inactive", true);
      net_priceLabel
        .classed("active", true)
        .classed("inactive", false);
      stu_popuLabel
        .classed("active", false)
        .classed("inactive", true);
    }
    else {
      satLabel
        .classed("active", false)
        .classed("inactive", true);
      actLabel
        .classed("active", false)
        .classed("inactive", true);
      net_priceLabel
        .classed("active", false)
        .classed("inactive", true);
      stu_popuLabel
        .classed("active", true)
        .classed("inactive", false);
    }
  }
});


console.log(state_data);
  var tbody=d3.select("tbody");
  tbody.html("");
  state_data.forEach((college) => {
  var row = tbody.append("tr");
  Object.entries(college).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
    });
  });


});
}






  })
