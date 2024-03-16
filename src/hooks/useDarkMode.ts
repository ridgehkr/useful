import { useEffect, useState } from 'react'

/**
 * Dark mode state and toggle function
 *
 * @property {boolean} isDarkMode - Whether or not dark mode is enabled
 * @property {(dark: boolean) => void} setIsDarkMode - A function to toggle dark mode
 */
export type DarkModeUsage = {
  isDarkMode: boolean
  setIsDarkMode: (dark: boolean) => void
}

// CSS class to apply to the document root when dark mode is enabled
const DARK_MODE_CLASS = 'dark-mode'

// Event name for the media query to listen for
const MEDIA_QUERY_EVENT = 'change'

// Media query to detect the user's system-wide dark mode preference
const MEDIA_QUERY = window.matchMedia('(prefers-color-scheme: dark)')

/**
 * A hook to manage dark mode state. The document root will also be given a dark-mode class when dark mode is enabled.
 *
 * @param {boolean} initiallyDark - Whether or not dark mode should be enabled by default. If not set, the user's system-wide dark mode preference will be defaulted to.
 * @returns - An array containing the current dark mode state and a function to toggle dark mode.
 */
const useDarkMode = (initiallyDark?: boolean): DarkModeUsage => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    initiallyDark ?? MEDIA_QUERY.matches
  )

  /**
   * When dark mode is enabled, apply the dark mode class to the document root.
   */
  useEffect(() => {
    document.documentElement.classList.toggle(DARK_MODE_CLASS, isDarkMode)
  }, [isDarkMode])

  /**
   * Update the dark mode state when the user's system-wide preference changes.
   */
  useEffect(() => {
    /**
     * A callback to update the dark mode state when the user's system-wide preference changes.
     */
    const handleSystemPreferenceChange = () => {
      setIsDarkMode(!!MEDIA_QUERY.matches)
    }

    // Watch for changes to the user's system-wide dark mode preference.
    MEDIA_QUERY.addEventListener(
      MEDIA_QUERY_EVENT,
      handleSystemPreferenceChange
    )

    return () => {
      MEDIA_QUERY.removeEventListener(
        MEDIA_QUERY_EVENT,
        handleSystemPreferenceChange
      )
    }
  }, [setIsDarkMode])

  return { isDarkMode, setIsDarkMode }
}

export default useDarkMode
