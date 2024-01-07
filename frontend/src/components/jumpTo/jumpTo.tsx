import { useState } from 'react'
import './jumpTo.css'
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react'

interface JumpToProps {
  up?: boolean
}

export default function JumpTo(props: JumpToProps) {
  const [isUp, setIsUp] = useState(props.up ?? false)

  return (
    <div className='jump-to' onClick={() => setIsUp(!isUp)}>
      {isUp ? <IconArrowUp /> : <IconArrowDown />}
    </div>
  )
}
