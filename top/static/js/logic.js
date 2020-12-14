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
  PRIVATE_NONPROFIT: new L.LayerGroup(),
  PRIVATE_FORPROFIT: new L.LayerGroup()
};

var maxBounds = [
  [5.499550, -167.276413], //Southwest
  [83.162102, -52.233040]  //Northeast
];



// Create the map with our layers
var map = L.map("map-id", {
  center: [39.8, -98.5],
  zoom: 8,
  layers: [
    layers.PUBLIC,
    layers.PRIVATE_NONPROFIT,
    layers.PRIVATE_FORPROFIT
  ]
});
map.setMaxBounds(maxBounds);
map.fitBounds(maxBounds);

// Add our 'lightmap' tile layer to the map
base.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "PUBLIC": layers.PUBLIC,
  "PRIVATE NON-PROFIT": layers.PRIVATE_NONPROFIT,
  "PRIVATE FOR-PROFIT": layers.PRIVATE_FORPROFIT
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
    icon: "ion-circled",
    iconColor: "white",
    markerColor: "blue",
    shape: "penta"
  }),
  PRIVATE_NONPROFIT: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "yellow",
    shape: "penta"
  }),
  PRIVATE_FORPROFIT: L.ExtraMarkers.icon({
    icon: "ion-plus-circled",
    iconColor: "white",
    markerColor: "red",
    shape: "penta"
  })
};

// Perform an API call to the Citi Bike Station Information endpoint
d3.json("static/data/top_college_final_latlon_json.json", function(data) {
  

  // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
    console.log(data);
    console.log(data[0].geometry);


    // Create an object to keep of the number of markers in each layer
    var typeCount = {
      PUBLIC: 0,
      PRIVATE_NONPROFIT: 0,
      PRIVATE_FORPROFIT: 0
    };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var typeCode;

    // Loop through the stations (they're the same size and have partially matching data)
    for (var i = 0; i < data.length; i++) {

      // Create a new station object with properties of both station objects
      //var type = Object.assign({}, data[i].properties.NAME);
      var geometry=data[i].geometry;
      var properties=data[i].properties;
      var type=data[i].properties['PUBLIC/PRIVATE']
      //console.log(type);
      // If a station is listed but not installed, it's coming soon
      if (type == 'PUBLIC') {
        typeCode = "PUBLIC";
      }
      // If a station has no bikes available, it's empty
      else if (type == 'PRIVATE NON-PROFIT') {
        typeCode = "PRIVATE_NONPROFIT";
      }
      // If a station is installed but isn't renting, it's out of order
      else  {
        typeCode = "PRIVATE_FORPROFIT";
      }
      

      // Update the station count
      typeCount[typeCode]++;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([geometry.x, geometry.y], {
        icon: icons[typeCode]
      });
      //console.log(geometry.x);
      //console.log(layers[typeCode]);
      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[typeCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(properties.NAME + "<br> Address: " + properties.ADDRESS + "<br> Website: <a href="+`properties.WEBSITE`+">" + properties.WEBSITE+"</a>");
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(typeCount);
  });

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(typeCount) {
  document.querySelector(".legend").innerHTML = [
    "<p class='out-of-order'>PUBLIC: " + typeCount.PUBLIC + "</p>",
    "<p class='coming-soon'>PRIVATE NON-PROFIT: " + typeCount.PRIVATE_NONPROFIT + "</p>",
    "<p class='empty'>PRIVATE FOR-PROFIT: " + typeCount.PRIVATE_FORPROFIT + "</p>"
  ].join("");
}
