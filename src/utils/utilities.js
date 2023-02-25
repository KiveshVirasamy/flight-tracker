/**
 * Calculates the heading direction from a given degree angle.
 * @param {number} deg - The degree angle.
 * @returns {string} - The heading direction.
 */
export function calculateTheHeadingDirection(deg) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];

  const index = Math.floor(deg / 22.5 + 0.5) % 16;
  return directions[index];
}

/**
 * Converts meters per second to kilometers per hour.
 * @param {number} metersPerSecond - The value in meters per second.
 * @returns {number} - The value in kilometers per hour.
 */
export function convertMPSToKPH(metersPerSecond) {
  return Math.round(metersPerSecond * 3.6);
}
