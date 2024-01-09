import './view.css'
import Sidebar from '../../components/sidebar/sidebar'
import Message from '../../components/message/message'
import { MessageResponse, MessageData } from '../../types/messageData'

import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import JumpTo from '../../components/jumpTo/jumpTo'

/**
 * View Component - Renders the Sidebar and Messages based on message data.
 * @returns {JSX.Element} View component.
 */
export default function View() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const [scrollBuffer, setScrollBuffer] = useState([0, 50])

  const messageData: MessageResponse = location.state
  const [searchTerm, setSearchTerm] = useState('')
  const pageTop = useRef(null)
  const pageBottom = useRef(null)

  /**
   * useEffect hook to control component behavior on location changes.
   * - Redirects to the root URL if messageData is not present in location.state.
   * - Sets the 'loaded' state to true when location.state is available, indicating the component is ready to render.
   * @param {Object} location - The current location object provided by react-router-dom.
   */
  useEffect(() => {
    if (!messageData) navigate('/')
    if (!location.state) return
    setLoaded(true)
  }, [location])

  return (
    <div className='view'>
      {loaded && (
        <>
          <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} guildName={messageData.guild_name} channelName={messageData.channel_name} />
          <div className='messages'>
            <span className='jump-anchor' ref={pageTop}></span>

            {messageData.messages
              .filter((message: MessageData) => message.content.toLowerCase().includes(searchTerm.toLowerCase()))
              .slice(scrollBuffer[0], scrollBuffer[1])
              .map((message: MessageData) => (
                <Message key={message.id} {...message} />
              ))}

            <span className='jump-anchor' ref={pageBottom}></span>
          </div>

          {/* Jump to bottom/top button */}
          <JumpTo upRef={pageTop} downRef={pageBottom} />
        </>
      )}
    </div>
  )
}
