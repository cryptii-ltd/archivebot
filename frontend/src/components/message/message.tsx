import './message.css'
import ProfilePicture from './profilePicture'
import Reaction from './reaction'
import Attachment from './attachment'
import { AttachmentProps } from './attachment'

import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import escapeStringRegexp from 'escape-string-regexp'
import { MessageData } from '../../types/messageData'

/**
 * Message Component - Displays a user message including profile picture, content, attachments, and reactions.
 * @param {MessageData} props - The properties for the Message component.
 * @returns {JSX.Element} Message component.
 */
export default function Message(props: MessageData) {
  const [content, setContent] = useState(props.content)

  /**
   * Handle mentions and attachments in the message content.
   */
  useEffect(() => {
    // Find global mentions (here, everyone)
    const globalMentions = ['here', 'everyone']
    setContent(getMentions(globalMentions, content, true))

    // Replace mentions with styled HTML spans
    if (props.mentions.length > 0) setContent(getMentions(props.mentions, content))

    // Remove attachment sources from the content
    if (props.attachments.length > 0) {
      props.attachments.map((attachment: AttachmentProps) => {
        setContent(content.replace(attachment.source, ''))
      })
    }
  }, [])

  return (
    <div className='message'>
      <ProfilePicture author={props.author} authorID={props.author_id} avatarHash={props.avatar_hash} />
      <div className='content'>
        <div className='info'>
          <span className='username'>{props.author}</span>
          <span className='time'>{ISOToContextualDate(props.date)}</span>
        </div>
        {content.length > 0 && (
          <div className='body'>
            <Markdown children={content} rehypePlugins={[rehypeRaw]} />
          </div>
        )}
        {props.attachments.length > 0 && (
          <div className='attachments'>
            {props.attachments.map((attachment, index) => (
              <Attachment key={index} source={attachment.source} type={attachment.type} spoiler={attachment.source.includes('SPOILER')} />
            ))}
          </div>
        )}
        {props.reactions.length > 0 && (
          <div className='reactions'>
            {props.reactions?.map((emote, index) => (
              <Reaction key={index} emote={emote[0]} count={emote[1]} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Replaces mentions in the content with styled HTML spans.
 * @param {string[]} mentions - Array of mentioned usernames.
 * @param {string} content - Original message content.
 * @returns {string} Content with styled mentions.
 */
function getMentions(mentions: string[], content: string, global: boolean = false) {
  mentions.map((mention) => {
    const regex = new RegExp(`@${escapeStringRegexp(mention)}`, 'gm')
    content = content.toString().replace(regex, `<span class="mention" data-global="${global}" username="${mention}">@${mention}</span>`)
  })

  return content
}

/**
 * Converts ISO time to contextual date format.
 * @param {number} ISOTime - Timestamp in ISO format.
 * @returns {string} Contextual date format.
 */
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
