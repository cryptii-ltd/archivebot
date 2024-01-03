import './view.css'
import Sidebar from '../components/sidebar/sidebar'
import Message from '../components/message/message'

import { useEffect, useState } from 'react'
import axios from 'axios'
import RenderIfVisible from 'react-render-if-visible'

export default function View() {
  const [messageData, setMessageData] = useState([])

  useEffect(() => {
    axios.get('https://api.archive-bot.net/v1/messages/courteous-beige-parrotfish').then((response) => {
      setMessageData(response.data.messages)
    })
  }, [])

  return (
    <>
      <Sidebar channelName={'test'} />
      <div className='messages'>
        {messageData.map((message, index) => (
          <RenderIfVisible stayRendered={true} key={index}>
            <Message key={message.id} author={message.author} authorID={message.author_id} avatarHash={message.avatar_hash} date={message.date} mentions={message.mentions} content={message.content} attachments={message.attachments} reactions={message.reactions} />
          </RenderIfVisible>
        ))}
      </div>
    </>
  )
}
