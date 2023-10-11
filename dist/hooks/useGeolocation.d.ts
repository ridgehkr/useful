export type GeoLocation = {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
};
/**
 * Track the user's current location via the browser's geolocation API.
 * @returns {GeoLocation} - The current latitude and longitude of the user, or an error message if a problem was encountered.
 */
declare const useGeoLocation: () => {
    location: GeoLocation;
    getLocation: () => void;
};
export default useGeoLocation;
