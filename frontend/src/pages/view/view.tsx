import './view.css'
import Sidebar from '../../components/sidebar/sidebar'
import Message from '../../components/message/message'
import MessageResponse from '../../types/messageData'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function View() {
  const location = useLocation()
  const navigate = useNavigate()
  const messageData: MessageResponse = location.state
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!messageData) navigate('/')

    if (!location.state) return
    setLoaded(true)
  }, [location])

  return (
    <div className='view'>
      {loaded && (
        <>
          <Sidebar channelName={messageData.channel_name} />
          <div className='messages'>
            {messageData.messages.map((message) => (
              <Message key={message.id} id={message.id} author={message.author} authorID={message.author_id} avatarHash={message.avatar_hash} date={message.date} mentions={message.mentions} content={message.content} attachments={message.attachments} reactions={message.reactions} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
