import style from './index.module.css'
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react'

import { useState } from 'react'

interface JumpToProps {
  upRef: React.MutableRefObject<HTMLElement | null>
  downRef: React.MutableRefObject<HTMLElement | null>
  goUp?: boolean
}

/**
 * JumpTo Component - Allows for jumping between the start/end of page.
 * @param {JumpToProps} props
 * @returns {JSX.Element} JumpTo Component
 */
export default function JumpTo(props: JumpToProps): JSX.Element {
  const [goUp, setGoUp] = useState(props.goUp ?? false)

  // TODO: Viewport scroll boundary detection to flip the arrow/scroll direction.
  const scroll = () => {
    goUp
      ? props.upRef.current?.scrollIntoView({ behavior: 'smooth' })
      : props.downRef.current?.scrollIntoView({ behavior: 'smooth' })
    setGoUp(!goUp)
  }

  return (
    <div
      className={style.jumpTo}
      onClick={() => scroll()}
    >
      {goUp ? <IconArrowUp /> : <IconArrowDown />}
    </div>
  )
}
