import './view.css'
import Sidebar from '../components/sidebar/sidebar'
import Message from '../components/message/message'

import { useEffect, useState } from 'react'
import axios from 'axios'
import RenderIfVisible from 'react-render-if-visible'

interface ViewProps {
  passphrase: string
}

export default function View(props: ViewProps) {
  const [messageData, setMessageData] = useState([])
  const [passphrase, setPassphrase] = useState('prime-yellow-elk')

  useEffect(() => {
    axios.get(`https://api.archive-bot.net/v1/messages/${passphrase}`).then((response) => {
      setMessageData(response.data.messages)
    })
  }, [])

  return (
    <>
      <Sidebar channelName={messageData.channel_name} />
      <div className='messages'>
        {messageData.map((message, index) => (
          <RenderIfVisible key={index} stayRendered={true}>
            <Message key={message.id} id={message.id} author={message.author} authorID={message.author_id} avatarHash={message.avatar_hash} date={message.date} mentions={message.mentions} content={message.content} attachments={message.attachments} reactions={message.reactions} />
          </RenderIfVisible>
        ))}
      </div>
    </>
  )
}
