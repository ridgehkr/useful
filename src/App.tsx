import { useState } from 'react'
import './App.css'
import useDebounce from './hooks/useDebounce'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  // debounce the search function to 300ms
  const handleSearch = useDebounce((value: string) => {
    setDebouncedValue(value)
  }, 300)

  // handle search input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
    handleSearch(newValue)
  }

  return (
    <div>
      <input type='text' value={inputValue} onChange={handleChange} />
      <p>Search functionality is debounced to 300ms.</p>
      {debouncedValue && <p>Searching for: {debouncedValue}</p>}
    </div>
  )
}

export default App
