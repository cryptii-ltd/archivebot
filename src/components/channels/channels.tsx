import './channels.css'

interface ChannelsProps {
  channels: ChannelProps[]
}

interface ChannelProps {
  name: string
  isActive?: boolean
}

export default function Channels(props: ChannelsProps) {
  return (
    <div className='channels'>
      <h3>Channels</h3>
      {props.channels.map((channel) => (
        <span key={crypto.randomUUID()} className='channel' data-active={channel.isActive}>
          #{channel.name}
        </span>
      ))}
    </div>
  )
}
