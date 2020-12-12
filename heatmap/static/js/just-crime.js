var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 13
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var link = "https://opendata.arcgis.com/datasets/0d7bedf9d582472e9ff7a6874589b545_0.geojson";

d3.json(link, function(response) {

  console.log(response);

  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i].geometry;

    if (location) {
      L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    }
  }

});
