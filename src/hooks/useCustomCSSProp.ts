import React, { useEffect, useState } from 'react'

type RefElement = React.RefObject<HTMLElement> | null

/**
 * Get the current value of a CSS custom property
 */
function getCustomPropertyValue(property: string, root: HTMLElement): string {
  try {
    return getComputedStyle(root).getPropertyValue(property)
  } catch (err) {
    console.error('Could not get property value', err)
    return ''
  }
}

/**
 * Track the value of a given CSS custom prop.
 * @param property - the CSS custom prop name to track.
 * @returns - the current value of the tracked CSS custom prop.
 */
const useCustomCSSProp = (property: string, r?: RefElement): string => {
  const [root, setRoot] = useState<HTMLElement>(
    r?.current ?? document.documentElement
  )
  const [propValue, setPropValue] = useState(() =>
    getCustomPropertyValue(property, root)
  )

  useEffect(() => {
    if (r) {
      setRoot(r?.current ?? document.documentElement)
    }
  }, [r])

  useEffect(() => {
    if (typeof property !== 'string' || !property.startsWith('--')) {
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      )
    } else {
      // MutationObserver allows efficient monitoring of changes to the custom property
      const observer = new MutationObserver(() => {
        const newValue = getCustomPropertyValue(property, root)
        if (newValue !== propValue) {
          setPropValue(newValue)
        }
      })

      // Start observing changes to the custom property
      observer.observe(root, {
        attributes: true,
        attributeFilter: ['style', 'class', 'id'],
      })

      return () => observer.disconnect()
    }
  }, [property, propValue, root])

  return propValue
}

export default useCustomCSSProp
