import './attachment.css'

interface AttachmentProps {
  source: string
  type: string
}

export default function Attachment(props: AttachmentProps) {
  if (props.type === 'image') return image(props.source)
  if (props.type === 'tenor') return tenor(props.source)
  if (props.type === 'video') return vid(props.source)

  return (
    <div className='attachment'>
      <a href={props.source}>{props.source}</a>
    </div>
  )
}

function image(source: string) {
  return (
    <div className='attachment'>
      <img src={source} alt='Image attachment' />
    </div>
  )
}

function tenor(source: string) {
  const tenorLink = `${source}.gif`
  return (
    <div className='attachment'>
      <img src={tenorLink} alt='A tenor gif' />
    </div>
  )
}

function vid(source: string) {
  const videoRegex: RegExp = /https?:\/\/.*\.(mp4|mov|wmv|flv|avi|mkv|webm|vp9)(\?.*)?/gm
  const videoLinks: string[][] = [...source.matchAll(videoRegex)]

  if (videoLinks.length > 0) {
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
}
