import { useState } from 'react'
import './jumpTo.css'
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react'

interface JumpToProps {
  upRef: React.MutableRefObject<HTMLElement | null>
  downRef: React.MutableRefObject<HTMLElement | null>
  goUp?: boolean
}

export default function JumpTo(props: JumpToProps) {
  const [goUp, setGoUp] = useState(props.goUp ?? false)

  const scroll = () => {
    goUp ? props.upRef.current?.scrollIntoView({ behavior: 'smooth' }) : props.downRef.current?.scrollIntoView({ behavior: 'smooth' })
    setGoUp(!goUp)
  }

  return (
    <div className='jump-to' onClick={() => scroll()}>
      {goUp ? <IconArrowUp /> : <IconArrowDown />}
    </div>
  )
}
