import './view.css'
import Sidebar from '../../components/sidebar/sidebar'
import Message from '../../components/message/message'
import MessageResponse from '../../types/messageData'

import RenderIfVisible from 'react-render-if-visible'

interface ViewProps {
  messageData: MessageResponse
}

export default function View(props: ViewProps) {
  return (
    <div className='view'>
      <Sidebar channelName={props.messageData.channelName} />
      <div className='messages'>
        {props.messageData.messages.map((message, index) => (
          <RenderIfVisible key={index} stayRendered={true}>
            <Message key={message.id} id={message.id} author={message.author} authorID={message.authorID} avatarHash={message.avatarHash} date={message.date} mentions={message.mentions} content={message.content} attachments={message.attachments} reactions={message.reactions} />
          </RenderIfVisible>
        ))}
      </div>
    </div>
  )
}
