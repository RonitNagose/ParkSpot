const mapDiv = document.getElementById("map");

if(!mapDiv){
    console.log("Map Div not Found");
}else{
    const lat = mapDiv.dataset.lat;
const lng = mapDiv.dataset.lng;

console.log("LAT :" , lat, "LNG :",lng);

var map = L.map('map').setView([lat, lng], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

L.marker([lat, lng]).addTo(map);
}