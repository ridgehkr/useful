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
 *
 * @param property
 * @returns
 */
const useCustomCSSProp = (
  property: string,
  rootElement?: HTMLElement
): string => {
  const [propValue, setPropValue] = useState(() =>
    getCustomPropertyValue(property, rootElement)
  )

  useEffect(() => {
    // MutationObserver allows efficient monitoring of changes the custom property
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
