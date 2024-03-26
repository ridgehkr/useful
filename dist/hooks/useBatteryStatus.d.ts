export type BatteryStatus = {
    level: number;
    charging: boolean;
};
/**
 * Utilize the Battery Status API to monitor the device's battery level and charging status.
 *
 * @returns {BatteryStatus} - The current battery status.
 */
declare const useBatteryStatus: () => BatteryStatus;
export default useBatteryStatus;
