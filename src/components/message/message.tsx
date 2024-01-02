import './message.css'
import { IconUserHexagon } from '@tabler/icons-react'
import Reaction from './reaction'

interface MessageProps {
  author: string
  authorID: string
  content: string
  date: number
  id: string
  attachments?: [
    {
      source: string
      type: string
    }
  ]
  avatarHash?: string
  reactions?: [string, number][]
}

export default function Message(props: MessageProps) {
  return (
    <div className='message'>
      <span className='profile-picture'>{!props.avatarHash ? <IconUserHexagon /> : <img alt={props.author + "'s profile picture"} src={`https://cdn.discordapp.com/avatars/${props.authorID}/${props.avatarHash}`} />}</span>
      <div className='content'>
        <div className='info'>
          <span className='username'>{props.author}</span>
          <span className='time'>{ISOToContextualDate(props.date)}</span>
        </div>
        <div className='body'>
          <p>{props.content}</p>
        </div>
        <div className='attachments'>
          {props.attachments?.map((attachment) => (
            <img src={attachment.source} />
          ))}
        </div>
        <div className='reactions'>
          {props.reactions?.map((emote, index) => (
            <Reaction key={index} emote={emote[0]} count={emote[1]} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ISOToContextualDate(ISOTime: number) {
  const now = new Date()
  const date = new Date(ISOTime)

  const delta: number = (now.getTime() - date.getTime()) / (1000 * 3600 * 24)

  const fDate = date.getDate().toString().padStart(2, '0')
  const fMonth = (date.getMonth() + 1).toString().padStart(2, '0')
  const fHour = date.getHours().toString().padStart(2, '0')
  const fMinute = date.getMinutes().toString().padStart(2, '0')

  if (delta > 1) {
    return `${fDate}/${fMonth}/${date.getFullYear()} at ${fHour}:${fMinute}`
  } else if (delta >= 0.5) {
    return `Yesterday at ${fHour}:${fMinute}`
  } else {
    return `Today at ${fHour}:${fMinute}`
  }
}
