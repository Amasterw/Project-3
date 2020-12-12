var myMap = L.map("map", {
  center: [39.8, -98.5],
  zoom: 16
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 6,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://opendata.arcgis.com/datasets/0d7bedf9d582472e9ff7a6874589b545_0.geojson";
d3.json("static/data/UniversityandCollegeCampuses.geojson", function(data){
  console.log(data);
  console.log(data.features.length);
});
d3.json(url, function(response) {

  console.log(response);
  console.log(response.features.length);

  var heatArray = [];

  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i].geometry;

    if (location) {
      //console.log(location.coordinates[1]);
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);

});
