import './channels.css'
import { IconHash } from '@tabler/icons-react'

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
      {props.channels.map((channel, index) => (
        <span key={index} className='channel' data-active={channel.isActive}>
          <IconHash stroke={1.5} />
          <span>{channel.name}</span>
        </span>
      ))}
    </div>
  )
}
