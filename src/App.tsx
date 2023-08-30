import { useState } from 'react'
import './App.css'
import useDebounce from './hooks/useDebounce'

function App() {
  const [inputValue, setInputValue] = useState('')
  const debouncedInputValue = useDebounce<string>(inputValue, 300)

  // handle search input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
  }

  return (
    <div>
      <input type='text' value={inputValue} onChange={handleChange} />
      <p>Search functionality is debounced to 300ms.</p>
      {debouncedInputValue && <p>Searching for: {debouncedInputValue}</p>}
    </div>
  )
}

export default App
