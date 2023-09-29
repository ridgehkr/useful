interface GeoLocation {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
}
declare const useGeoLocation: () => {
    location: GeoLocation;
    getLocation: () => void;
};
export default useGeoLocation;
