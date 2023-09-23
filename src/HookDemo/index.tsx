import { useState } from 'react'
import useThrottle from '../hooks/useThrottle'
import { createRoot } from 'react-dom/client'
import style from './HookDemo.module.css'
import '@fontsource-variable/inter'

const HookDemo = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const throttledValue = useThrottle<string>(inputValue)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className={style.demo}>
      <header className={style.header}>
        <h1>useThrottle</h1>
      </header>

      <p>
        <input onChange={handleInputChange} />
      </p>
      <p>
        Throttled input value: <strong>{throttledValue}</strong>
      </p>
    </div>
  )
}

export default HookDemo

createRoot(document.getElementById('root') as HTMLElement).render(<HookDemo />)
