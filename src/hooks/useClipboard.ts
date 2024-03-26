import { useCallback, useState } from 'react'

// status of the clipboard
export type ClipboardStatus = {
  value: string | null
  copy: (text: string) => void
  clear: () => void
}

/**
 * Manages the clipboard state and provides functions to interact with it.
 * NOTE: This hook relies on the Clipboard API, which currently has limited browser support.
 * It also requires HTTPS to work in modern browsers.
 *
 * Clipboard API: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
 *
 * @returns {ClipboardStatus} - The clipboard status and functions to interact with it.
 */
const useClipboard = (): ClipboardStatus => {
  const [value, setValue] = useState<string | null>(null)

  /**
   * Copies the provided text to the clipboard.
   */
  const copy = useCallback(
    (text: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => setValue(text))
        .catch((error) => console.error('Failed to copy:', error))
    },
    [setValue]
  )

  /**
   * Clears the current clipboard value.
   */
  const clear = useCallback(() => {
    setValue(null)
  }, [setValue])

  return { value, copy, clear }
}

export default useClipboard
