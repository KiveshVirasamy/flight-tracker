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

// Function to add flight info to the container
export function addFlightInfoToContainer(flight: Flight): void {
  // Get the flights-info container
  const flightInfo = document.getElementById("flights-info");
  // If container is not found, return
  if (!flightInfo) return;

  // Convert the speed from m/s to km/h using utility function
  const speed: number = Utils.convertMPSToKPH(flight[11] ?? 0.0);

  // Calculate the direction
  const direction: number = Utils.calculateTheHeadingDirection(flight[10] ?? "none");

  // Create HTML for a single flight and insert it into the container
  const flightHtml = `
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
  flightInfo.insertAdjacentHTML("beforeend", flightHtml);
}

// Function to add event listeners to flight tracking buttons
export function addEventListenerToFlightButtons(flights: Flight[]): void {
  // Get all the track buttons
  const viewButtons = document.querySelectorAll(".track-button");

  // For each button, find the related flight info and add a click event listener
  viewButtons.forEach((button: Element) => {
    const relatedInfo = flights.find((flight) => flight[1] === button.id);
    button.addEventListener("click", () =>
      toggleFlightFocus(button, relatedInfo)
    );
  });
}

// Function to toggle the focus on a flight
function toggleFlightFocus(button: HTMLButtonElement, fltInfo: Flight): void {
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
}

// Function to show and hide buttons based on the button text
function showAndHideButtonsAfterClick(innerText: string): void {
  const buttons = document.querySelectorAll(".track-button");

  // For each button, toggle the hidden class based on the button text
  buttons.forEach((button) => {
    button.parentNode?.classList.toggle(
      "hidden",
      button.innerText !== innerText
    );
  });
}
