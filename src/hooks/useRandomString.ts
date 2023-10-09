import { useCallback, useEffect, useState, useMemo } from 'react'

type StringGeneratorOptions = {
  length?: number
  symbols?: boolean
  numbers?: boolean
  uppercase?: boolean
}

/**
 * Generate an array of numbers from @min to @max.
 * @param {number} min - The minimum number in the array.
 * @param {number} max - The maximum number in the array.
 * @returns - An array of numbers from @min to @max.
 */
const arrayFromLowToHigh = (min: number, max: number) => {
  const array: number[] = []

  for (let i = min; i <= max; i++) {
    array.push(i)
  }

  return array
}

// ASCII character codes for lowercase, uppercase, numbers, and symbols.
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)

/**
 * Returns a new array containing the shuffled items from the original array.
 * @param {Array} ordered - items An array containing the items.
 */
const shuffle = <T>(ordered: T[]) => {
  let j, x, i
  const shuffled: T[] = [...ordered]
  for (i = shuffled.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = x
  }

  return shuffled
}

/**
 * Generate a string of randomized characters and of a specific length.
 * @param {StringGeneratorOptions} options - The initial properties of the randomized string
 * @returns - a randomly-generated string, the properties it was created with, and functions to change these properties
 */
const useRandomString = (options: StringGeneratorOptions) => {
  const [value, setValue] = useState('')
  const [length, setLength] = useState(options?.length ?? 12)
  const [includeSymbols, setIncludeSymbols] = useState(!!options?.symbols)
  const [includeNumbers, setIncludeNumbers] = useState(!!options?.numbers)
  const [includeUppercase, setIncludeUppercase] = useState(!!options?.uppercase)

  /**
   * Assemble together all the available characters from which to generate a password based on the current settings.
   */
  const availableCharacters = useMemo(() => {
    const available = [[...LOWERCASE_CHAR_CODES]]

    if (includeUppercase) {
      available.push([...UPPERCASE_CHAR_CODES])
    }
    if (includeNumbers) {
      available.push([...NUMBER_CHAR_CODES])
    }
    if (includeSymbols) {
      available.push([...SYMBOL_CHAR_CODES])
    }

    return available
  }, [includeNumbers, includeSymbols, includeUppercase])

  /**
   * Generate a new password based on the current settings.
   */
  const generateString = useCallback(() => {
    const newStringArray = []
    for (let i = 0; i < length; i++) {
      const selectionPool = availableCharacters[i % availableCharacters.length]
      const randomIndex = Math.floor(Math.random() * selectionPool.length)
      newStringArray.push(selectionPool[randomIndex])
    }

    const newPassword = shuffle(newStringArray)
      .map((charCode) => String.fromCharCode(charCode))
      .join('')

    setValue(newPassword)
  }, [length, availableCharacters])

  /**
   * Generate a new password whenever the password settings change.
   */
  useEffect(() => {
    generateString()
  }, [includeSymbols, includeNumbers, includeUppercase, length, generateString])

  return {
    value,
    length,
    setLength,
    symbols: includeSymbols,
    includeSymbols: setIncludeSymbols,
    numbers: includeNumbers,
    includeNumbers: setIncludeNumbers,
    uppercase: includeUppercase,
    includeUppercase: setIncludeUppercase,
  }
}

export default useRandomString
