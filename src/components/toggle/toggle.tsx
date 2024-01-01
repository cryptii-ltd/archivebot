import { useState } from 'react'
import './toggle.css'

interface ToggleProps {
  isToggled: boolean
}

export default function Toggle(props: ToggleProps) {
  const [toggled, setToggled] = useState(props.isToggled)

  return <div className='toggle' data-toggled={toggled} onClick={() => setToggled(!toggled)}></div>
}
