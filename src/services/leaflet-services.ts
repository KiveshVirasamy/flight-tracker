import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Initialize the map
const map = L.map("map").setView([-35, 25], 2);

// Define the plane icon
const planeIconHtml = `<img src="../../assets/img/airplane.png" alt="plane icon" width="50px" height="50px">`;
const planeIcon = L.divIcon({
  html: planeIconHtml,
  iconSize: [24, 24],
  className: "plane-icon",
});

// Add the tile layer and marker to the map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
const marker = L.marker([-35, 25], { icon: planeIcon }).addTo(map);

// Define functions to reset the map view and set the map and marker to a given location
export function resetMapLocationView(): void {
  map.flyTo([-35, 23], 2);
}

export function setMapAndMarkerToCurrentFlightLocation(
  lat: number,
  lon: number,
  heading: number
): void {
  map.flyTo([lat, lon], 10);
  marker.setLatLng([lat, lon]);
  planeIcon.options.rotationAngle = heading - 90;
}
