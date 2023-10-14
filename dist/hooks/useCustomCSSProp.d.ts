import React from 'react';
/**
 * Track the value of a given CSS custom prop.
 * @param {string} property - the CSS custom prop name to track.
 * @param {RefElement} r (optional) - a React ref object to test the custom prop's value on (defaults to document root).
 * @returns - the current value of the tracked CSS custom prop.
 */
declare const useCustomCSSProp: (property: string, r?: React.RefObject<HTMLElement>) => string;
export default useCustomCSSProp;
