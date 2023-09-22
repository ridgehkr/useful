import useMousePosition from '../hooks/useMousePosition'
import { createRoot } from 'react-dom/client'
import style from './HookDemo.module.css'
import '@fontsource-variable/inter'

const HookDemo = () => {
  const { x, y } = useMousePosition()

  return (
    <div className={style.demo}>
      <header className={style.header}>
        <h1>useMousePosition</h1>
      </header>

      <p>
        <strong>
          {x}, {y}
        </strong>
      </p>
    </div>
  )
}

export default HookDemo

createRoot(document.getElementById('root') as HTMLElement).render(<HookDemo />)
