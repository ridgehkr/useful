import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import useCSSCustomProp from '../hooks/useCustomCSSProp'
import style from './HookDemo.module.css'
import '@fontsource-variable/inter'
import './global.css'

const HookDemo = () => {
  const demoRef = useRef(null)
  const buttonRadius = useCSSCustomProp('--radius', demoRef)

  useEffect(() => {
    console.log('--radius change', buttonRadius)
  }, [buttonRadius])

  return (
    <div className={`${style.demo} hook-demo`} ref={demoRef}>
      <header className={style.header}>
        <h1>useCustomCSSProp</h1>
      </header>

      <button
        type='button'
        className='button'
        style={{
          borderRadius: buttonRadius,
          backgroundColor: '#ffcc00',
          border: 0,
        }}
      >
        Rounded Button
      </button>
    </div>
  )
}

export default HookDemo

createRoot(document.getElementById('root') as HTMLElement).render(<HookDemo />)
