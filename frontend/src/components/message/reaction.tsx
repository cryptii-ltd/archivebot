import './reaction.css'

interface ReactionProps {
  emote: string
  count: number
}

/**
 * Reaction Component - Displays reaction and count.
 * @param {ReactionProps} props - The properties for the Reaction component.
 * @returns {JSX.Element} Reaction component.
 */
export default function Reaction(props: ReactionProps) {
  return (
    <div className='reaction'>
      <span className='emote'>{props.emote}</span>
      <span className='count'>{props.count}</span>
    </div>
  )
}
