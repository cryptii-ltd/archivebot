import './reaction.css'

interface ReactionProps {
  emote: string
  count: number
}

export default function Reaction(props: ReactionProps) {
  return (
    <div className='reaction'>
      <span className='emote'>{props.emote}</span>
      <span className='count'>{props.count}</span>
    </div>
  )
}
