import { useState } from 'react'
import './toggle.css'

interface ToggleProps {
  isToggled: boolean
}

/**
 * Toggle Component - Renders a toggle switch. Usually used in conjunction with the Setting Component.
 * @param {ToggleProps} props
 * @returns {JSX.Element} - Toggle Component
 */
export default function Toggle(props: ToggleProps): JSX.Element {
  const [toggled, setToggled] = useState(props.isToggled)

  return <div className='toggle' data-toggled={toggled} onClick={() => setToggled(!toggled)}></div>
}
