import { useEffect, useState } from 'react'

/**
 * Get the current value of a CSS custom property
 */
function getCustomPropertyValue(
  property: string,
  rootElement?: HTMLElement
): string | null {
  return getComputedStyle(
    rootElement ?? document.documentElement
  ).getPropertyValue(property)
}

/**
 * Track the value of a given CSS custom prop.
 * @param property - the CSS custom prop name to track.
 * @returns - the current value of the tracked CSS custom prop.
 */
const useCustomCSSProp = (
  property: string,
  rootElement?: HTMLElement
): string => {
  const [propValue, setPropValue] = useState(() =>
    getCustomPropertyValue(property, rootElement)
  )

  useEffect(() => {
    // MutationObserver allows efficient monitoring of changes to the custom property
    const observer = new MutationObserver(() => {
      const newValue = getCustomPropertyValue(property)
      if (newValue !== propValue) {
        setPropValue(newValue)
      }
    })

    // Start observing changes to the custom property
    observer.observe(rootElement ?? document.documentElement, {
      attributes: true, // Watch for attribute changes
      attributeFilter: ['style'], // Only watch changes to the style attribute
    })

    return () => observer.disconnect()
  }, [property, propValue, rootElement])

  return propValue ?? ''
}

export default useCustomCSSProp
