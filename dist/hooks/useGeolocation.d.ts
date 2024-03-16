/**
 * A latitude/longitude location with an optional error message.
 *
 * @typedef {Object} GeoLocation
 * @property {number} latitude - The latitude of the user's current location.
 * @property {number} longitude - The longitude of the user's current location.
 * @property {string} error - An error message if a problem was encountered.
 */
export type GeoLocation = {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
};
/**
 * Track the user's current location via the browser's geolocation API.
 *
 * @returns {GeoLocation} - The current latitude and longitude of the user, or an error message if a problem was encountered.
 */
declare const useGeoLocation: () => {
    location: GeoLocation;
    getLocation: () => void;
};
export default useGeoLocation;
