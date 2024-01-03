import './message.css'
import ProfilePicture from './profilePicture'
import Reaction from './reaction'

import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import escapeStringRegexp from 'escape-string-regexp'

interface MessageProps {
  author: string
  authorID: string
  content: string
  date: number
  id: string
  mentions: string[]
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
  const [content, setContent] = useState(props.content)

  useEffect(() => {
    if (props.mentions.length === 0) return
    setContent(getMentions(props.mentions, content))
  }, [])

  return (
    <div className='message'>
      <ProfilePicture author={props.author} authorID={props.authorID} avatarHash={props.avatarHash} />
      <div className='content'>
        <div className='info'>
          <span className='username'>{props.author}</span>
          <span className='time'>{ISOToContextualDate(props.date)}</span>
        </div>
        <div className='body'>
          <Markdown children={content} rehypePlugins={[rehypeRaw]} />
        </div>
        <div className='attachments'>
          {props.attachments?.map((attachment, index) => (
            <img src={attachment.source} key={index} />
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

function getMentions(mentions: string[], content: string) {
  mentions.map((mention) => {
    const regex = new RegExp(`@${escapeStringRegexp(mention)}`, 'gm')
    content = content.toString().replace(regex, `<span class="mention" username="${mention}">@${mention}</span>`)
  })

  return content
}

function ISOToContextualDate(ISOTime: number) {
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
