import './channels.css'
import { IconHash } from '@tabler/icons-react'

interface ChannelsProps {
  channels: Channel[]
}

interface Channel {
  name: string
  isActive?: boolean
}

/**
 * Channels Component - Displays a list of channels for a specific guild.
 * @param {ChannelsProps} props - The properties for the Channels component.
 * @returns {JSX.Element} Channels component.
 */
export default function Channels(props: ChannelsProps): JSX.Element {
  return (
    <div className='channels'>
      {props.channels.map((channel, index) => (
        <span key={index} className='channel' data-active={channel.isActive}>
          <IconHash stroke={1.5} />
          <span>{channel.name}</span>
        </span>
      ))}
    </div>
  )
}
