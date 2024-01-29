import style from './Reaction.module.css'

interface ReactionProps {
  emote: string
  count: number
}

/**
 * Reaction Component - Displays reaction and count.
 * @param {ReactionProps} props - The properties for the Reaction component.
 * @returns {JSX.Element} Reaction component.
 */
export default function Reaction(props: ReactionProps): JSX.Element {
  return (
    <div className={style.reaction}>
      <span className={style.emote}>{props.emote}</span>
      <span className={style.count}>{props.count}</span>
    </div>
  )
}
