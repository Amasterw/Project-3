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

var maxBounds = [
  [5.499550, -167.276413], //Southwest
  [83.162102, -52.233040]  //Northeast
];



// Create the map with our layers
var map = L.map("map-id", {
  center: [39.8, -98.5],
  //setView:[39.8, -98.5]
  zoom: 16,
  layers: [
    layers.PUBLIC,
    layers.PRIVATE
    //layers.PRIVATE_NONPROFIT,
    //layers.PRIVATE_FORPROFIT
  ]
});
map.setMaxBounds(maxBounds);
map.fitBounds(maxBounds);

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
L.control.layers(baseMaps, overlays).addTo(map);

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

  // PRIVATE_NONPROFIT: L.ExtraMarkers.icon({
  //   icon: "ion-minus-circled",
  //   iconColor: "white",
  //   markerColor: "yellow",
  //   shape: "penta"
  // }),
  // PRIVATE_FORPROFIT: L.ExtraMarkers.icon({
  //   icon: "ion-plus-circled",
  //   iconColor: "white",
  //   markerColor: "red",
  //   shape: "penta"
  // })
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
    console.log(t);
    var s=data[i].properties.State;
    state.push(s);
    //var uniqueCountry=[...new Set(dupCountry)];

  }
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
    newMarker.bindPopup(properties.Name + "<br> City: " + properties.City + "<br> Website: <a href='https://"+properties.Website+"' "+"target='_blank'>" + properties.Website+"</a>");
      
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
              //layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr>");
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
//     var button=d3.select("#form");
// console.log(button);
document.querySelector('button').onclick=function(){update()};
function update(){
  map.removeLayer(layers['PUBLIC']);
  map.removeLayer(layers['PRIVATE']);
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
    console.log(data[i].properties['Public/Private']);
    for (var j=0;j<enabledType.length;j++){
      console.log(enabledType[j]);
      if(data[i].properties['Public/Private'] === enabledType[j]){
        console.log(data[i]);

        type_data.push(data[i]);
      }
    }
  }
  console.log(type_data)
  // for(var j=0;j<enabledSettings.length;j++){
    
  //     var filteredData = data.filter(data => data.properties.State === enabledSettings);
  //     new_data.push(filteredData);
    
  // }
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
  for (var i=0;i<type_data.length;i++){
    for (var j=0;j<enabledSettings.length;j++){
      if(data[i].properties.State == enabledSettings[j]){
        state_data.push(data[i]);
      }
    }
  }
  console.log(state_data);

  

  
  //console.log(filteredData);
  //var filteredData = data.filter(data => data.properties.State IN (enabledSettings));
  


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
})

