// Importing the necessary functions from separate files.
import { Observable } from "rxjs";
import {
  addEventListenerToFlightButtons,
  addFlightInfoToContainer
} from "./dom-manipulation";
import { getFlightInfo } from "./services/flights-services";

// Interface for Flight data from API.
interface FlightData {
  states: Array<any>;
}

// Observable to fetch flight data from API.
const flightData$: Observable<FlightData> = Observable.create(
  async (observer) => {
    try {
      const response = await getFlightInfo();
      const flightData: FlightData = await response.json();
      observer.next(flightData);
      observer.complete();
    } catch (error) {
      observer.error(error);
    }
  }
);

// Observable to add flight information to the container in the DOM.
const addFlightInfo$: Observable<any> = Observable.create((observer) => {
  flightData$.subscribe(
    (flightData) => {
      flightData.states.forEach((flight) => {
        addFlightInfoToContainer(flight);
      });
      observer.next();
      observer.complete();
    },
    (error) => {
      observer.error(error);
    }
  );
});

// Observable to add event listener to the track flight button.
const addEventListener$: Observable<any> = Observable.create((observer) => {
  flightData$.subscribe(
    (flightData) => {
      addEventListenerToFlightButtons(flightData.states);
      observer.next();
      observer.complete();
    },
    (error) => {
      observer.error(error);
    }
  );
});

// Subscription to call the observables and catch errors.
const subscription = addFlightInfo$.subscribe(
  () => {
    addEventListener$.subscribe(
      () => {
        subscription.unsubscribe();
      },
      (error) => {
        console.error(error);
      }
    );
  },
  (error) => {
    console.error(error);
  }
);
