import { concatMap, Observable } from "rxjs";
import {
  addEventListenerToFlightButtons,
  addFlightInfoToContainer
} from "./dom-manipulation";

import { getFlightInfo } from "./services/flights-services";

interface FlightData {
  states: Array<any>;
}

const flightData$: Observable<FlightData> = Observable.create(async (observer: any) => {
  try {
    const storedData = sessionStorage.getItem('flightData');
    if (storedData) {
      const flightData: FlightData = JSON.parse(storedData);
      observer.next(flightData);
      observer.complete();
    } else {
      const response = await getFlightInfo();
      const flightData: FlightData = await response.json();
      sessionStorage.setItem('flightData', JSON.stringify(flightData));
      observer.next(flightData);
      observer.complete();
    }
  } catch (error) {
    observer.error(error);
  }
});

const addFlightInfo$: Observable<void> = flightData$.pipe(
  concatMap((flightData: FlightData) => {
    flightData.states.forEach((flight) => {
      addFlightInfoToContainer(flight);
    });
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  })
);

const addEventListener$: Observable<void> = flightData$.pipe(
  concatMap((flightData: FlightData) => {
    addEventListenerToFlightButtons(flightData.states);
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  })
);

const subscription = addFlightInfo$.subscribe(() => {
  addEventListener$.subscribe(() => {
    subscription.unsubscribe();
  }, (error: any) => {
    console.error(error);
  });
}, (error: any) => {
  console.error(error);
});
