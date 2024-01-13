import './attachment.css'
import { IconEye } from '@tabler/icons-react'

import { useState } from 'react'

export interface AttachmentProps {
  name?: string
  source: string
  type: string
  spoiler?: boolean
}

/**
 * Attachment Component - Displays different types of message attachments based on their source and type.
 * @param {AttachmentProps} props - The properties for the Attachment component.
 * @returns {JSX.Element} Attachment component.
 */
export default function Attachment(props: AttachmentProps): JSX.Element | undefined {
  if (props.type === 'image' || (props.source.toLowerCase().match('.gif|.ico|.heic|.jpeg|.jpg|.png|.svg|.webp') && props.type === 'attachment')) return Image(props)
  if (props.type === 'tenor') return Tenor(props)
  if (props.type === 'video' || (props.source.toLowerCase().match('.mov|.mp4|.mkv') && props.type === 'attachment')) return Vid(props)

  return (
    <div className='attachment' data-type={props.type}>
      <a href={props.source} target='_blank'>
        {props.source}
      </a>
    </div>
  )
}

function Image(props: AttachmentProps) {
  const [spoiler, setSpoiler] = useState(props.spoiler)

  return (
    <>
      {spoiler ? (
        <div className='spoiler'>
          <div className='attachment' data-type={props.type}>
            <img src={props.source} alt={props.name} />
          </div>

          <div className='reveal'>
            <IconEye size={52} stroke={1.5} onClick={() => setSpoiler(false)} />
            <span>Show spoiler</span>
          </div>
        </div>
      ) : (
        <div className='attachment' data-type={props.type}>
          <img src={props.source} alt={props.name} />
        </div>
      )}
    </>
  )
}

function Tenor(props: AttachmentProps) {
  const tenorLink = `${props.source}.gif`
  return (
    <div className='attachment'>
      <img src={tenorLink} alt='A tenor gif' />
    </div>
  )
}

function Vid(props: AttachmentProps) {
  const videoRegex: RegExp = /https?:\/\/.*\.(mp4|mov|wmv|flv|avi|mkv|webm|vp9)(\?.*)?/gm
  const videoLinks: string[][] = [...props.source.matchAll(videoRegex)]

  if (videoLinks.length === 0) return

  return (
    <div className='attachment'>
      {videoLinks.map((link, index) => (
        <video key={index} controls>
          <source src={link[0]} />
        </video>
      ))}
    </div>
  )
}
