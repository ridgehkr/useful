import { useEffect, useState } from 'react'

/**
 * Get the current value of a CSS custom property
 */
function getCustomPropertyValue(
  property: string,
  rootElement?: HTMLElement
): string {
  return (
    getComputedStyle(rootElement ?? document.documentElement).getPropertyValue(
      property
    ) ?? ''
  )
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
    if (typeof property !== 'string' || !property.startsWith('--')) {
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      )
    } else {
      // MutationObserver allows efficient monitoring of changes to the custom property
      const observer = new MutationObserver(() => {
        const newValue = getCustomPropertyValue(property)
        if (newValue !== propValue) {
          setPropValue(newValue)
        }
      })

      // Start observing changes to the custom property
      observer.observe(rootElement ?? document.documentElement, {
        attributes: true,
        attributeFilter: ['style'],
      })

      return () => observer.disconnect()
    }
  }, [property, propValue, rootElement])

  return propValue
}

export default useCustomCSSProp
