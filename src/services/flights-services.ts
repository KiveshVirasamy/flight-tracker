const BASE_URL: string =
    "https://opensky-network.org/api/states/all?lamin=-35.8229&lomin=16.2562&lamax=-22.8389&lomax=33.3526";

export function getFlightInfo(): Promise<Response> {
    return fetch(`${BASE_URL}`);
}