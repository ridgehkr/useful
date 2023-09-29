/**
 * Track the value of a given CSS custom prop.
 * @param property - the CSS custom prop name to track.
 * @returns - the current value of the tracked CSS custom prop.
 */
declare const useCustomCSSProp: (property: string, rootElement?: HTMLElement) => string;
export default useCustomCSSProp;
