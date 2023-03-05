// Import Leaflet and utility functions
import * as LeafletServices from "./services/leaflet-services";
import * as Utils from "./utils/utilities";

// Define the Flight type
type Flight = [
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  boolean,
  number,
  number,
  number
];

// Higher-order function that returns a function to create HTML for a single flight
function createFlightHtml(flight: Flight): () => string {
  // Convert the speed from m/s to km/h using utility function
  const speed = Utils.convertMPSToKPH(flight[11] ?? 0.0);

  // Calculate the direction
  const direction = Utils.calculateTheHeadingDirection(flight[10] ?? "none");

  return () => `
    <div class="single-flight">
      <span>${flight[1] || "None"}</span>
      <span class="media full-screen">${speed}km/h</span>
      <span>${direction}</span>
      <span class="media large-screen-size">${flight[7] ?? 0.0}m</span>
      <span> ${flight[7] ?? 0}</span>
      <button
        id="${flight[1]}"
        class="track-button">
        Where is it?
      </button>
    </div>`;
}

// Higher-order function that returns a function to toggle the focus on a flight
function toggleFlightFocus(fltInfo: Flight): (button: HTMLButtonElement) => void {
  return (button: HTMLButtonElement) => {
    const mapElements = document.getElementById("map");

    // If button says CLOSE, hide the map and reset the view
    if (button.innerText === "CLOSE") {
      mapElements!.style.visibility = "hidden";
      button.innerText = "Where is it?";
      LeafletServices.resetMapLocationView();
    } else {
      // Otherwise, show the map and set the marker to the flight location
      mapElements!.style.visibility = "visible";
      button.innerText = "close";
      LeafletServices.setMapAndMarkerToCurrentFlightLocation(
        fltInfo[6],
        fltInfo[5],
        fltInfo[10]
      );
    }

    // Show and hide buttons based on the button text
    showAndHideButtonsAfterClick(button.innerText);
  };
}

// Function to add flight info to the container
export function addFlightInfoToContainer(flight: Flight): void {
  // Get the flights-info container
  const flightInfo = document.getElementById("flights-info");
  // If container is not found, return
  if (!flightInfo) return;

  const createHtml = createFlightHtml(flight);

  // Create HTML for a single flight and insert it into the container
  flightInfo.insertAdjacentHTML("beforeend", createHtml());
}

// Higher-order function that returns a function to add event listeners to flight tracking buttons
function addEventListenerToFlightButton(flight: Flight): () => void {
  return () => {
    // Get the track button for this flight
    const button = document.getElementById(flight[1]) as HTMLButtonElement | null;

    // If the button does not exist, return
    if (!button) return;

    const toggleFocus = toggleFlightFocus(flight);

    button.addEventListener("click", () => toggleFocus(button));
  };
}

// Function to add event listeners to flight tracking buttons
export function addEventListenerToFlightButtons(flights: Flight[]): void {
  flights.map(addEventListenerToFlightButton).forEach((addListener) => addListener());
}

