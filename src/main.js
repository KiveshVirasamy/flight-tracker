// Importing the necessary functions from separate files.
import {
  addEventListenerToFlightButtons,
  addFlightInfoToContainer,
} from "./dom-manipulation.js";
import { getFlightInfo } from "./services/flights-services.js";

// Async function to fetch and display flight information.
async function displayFlightInfo() {
  try {
    // Fetching flight data from API.
    const response = await getFlightInfo();
    const flightData = await response.json();

    // Adding flight information to the container in the DOM.
    flightData.states.forEach((flight) => {
      addFlightInfoToContainer(flight);
    });

    // Adding event listener to the track flight button.
    addEventListenerToFlightButtons(flightData.states);
  } catch (error) {
    console.error(error);
  }
}

// Calling the displayFlightInfo function.
displayFlightInfo();
