import React from 'react';
type RefElement = React.RefObject<HTMLElement> | null;
/**
 * Track the value of a given CSS custom prop.
 * @param property - the CSS custom prop name to track.
 * @returns - the current value of the tracked CSS custom prop.
 */
declare const useCustomCSSProp: (property: string, r?: RefElement) => string;
export default useCustomCSSProp;
