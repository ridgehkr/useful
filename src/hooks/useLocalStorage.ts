import { useState } from 'react'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? JSON.parse(storedValue) : initialValue
  })

  const setStoredValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue]
}

export default useLocalStorage
