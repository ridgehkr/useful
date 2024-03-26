export type DeviceOrientationData = {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
};
/**
 * Monitor the device's orientation around the X (beta), Y (gamma), and Z (alpha) axes.
 *
 * @returns {DeviceOrientationData} - The current device orientation data.
 */
declare const useDeviceOrientation: () => DeviceOrientationData;
export default useDeviceOrientation;
