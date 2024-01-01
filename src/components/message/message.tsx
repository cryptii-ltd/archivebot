import './message.css'
import { IconUserHexagon } from '@tabler/icons-react'

interface MessageProps {
  author: string
  authorID: string
  content: string[]
  date: string
  id: string
  avatarHash?: string
}

export default function Message(props: MessageProps) {
  return (
    <div className='message'>
      <span className='profile-picture'>{!props.avatarHash ? <IconUserHexagon /> : <img alt={props.author + "'s profile picture"} src={props.avatarHash} />}</span>
      <div className='content'>
        <div className='info'>
          <span className='username'>{props.author}</span>
          <span className='time'>{props.date}</span>
        </div>
        <div className='body'>
          {props.content.map((paragraph) => (
            <p key={crypto.randomUUID()}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
