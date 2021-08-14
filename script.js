const btnIpSearch = document.getElementById("btn_ip_search");
function renderMap (lat, lng) {
  let mymap = L.map('mapid', { zoomControl: false}).setView([lat, lng], 13);
  let ratio = 1;
  let myIcon = L.icon({
    iconUrl: 'assets/images/icon-location.svg',
    iconSize: [(46 * ratio), (56 * ratio)],
    iconAnchor: [23, 56],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});
  L.marker([lat, lng], { icon: myIcon }).addTo(mymap);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3VpbGhlcm1lbWQiLCJhIjoiY2tyanE1OTRyMHN0NjJxa2RhdTVqczB5NiJ9.p_jM5xrwXD7DP1nfI0PuRw'
}).addTo(mymap);
}
renderMap(40.650, -73.949);

async function fetchApi(param) {
  const mapDiv = document.getElementById("mapid");
  mapDiv.remove();
  const mapDiv2 = document.createElement("div");
  mapDiv2.setAttribute("id", "mapid");
  document.body.appendChild(mapDiv2);

  let url = `
  https://geo.ipify.org/api/v1?apiKey=at_LDZhbJcnGgV7mnIZ9vV0E82Ubm429&ipAddress=${param}`;

  const response = await fetch(url);
  const data = await response.json();
  const ip = document.getElementById("ip");
  ip.textContent = data.ip
  const location = document.getElementById("location");
  location.textContent = `${data.location.city}, ${data.location.region} - ${data.location.country}`;
  const utc = document.getElementById("utc");
  utc.textContent = `UTC ${data.location.timezone}`;
  const isp = document.getElementById("isp");
  isp.textContent = data.isp;
  renderMap(data.location.lat, data.location.lng);
}

btnIpSearch.addEventListener("click", () => {
  let inputIpSearch = document.getElementById("input_search_ipAddress").value;
  const dataFromIP = fetchApi(inputIpSearch);
});

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  const mapDiv = document.getElementById("mapid");
  mapDiv.remove();
  const mapDiv2 = document.createElement("div");
  mapDiv2.setAttribute("id", "mapid");
  document.body.appendChild(mapDiv2);
  console.log('Sua posição atual é:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('Mais ou menos ' + crd.accuracy + ' metros.');
  renderMap(crd.latitude, crd.longitude);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

const btn_location = document.getElementById("btn_location")

btn_location.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(success, error, options);
});

