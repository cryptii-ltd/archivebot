import './view.css'
import Sidebar from '../../components/sidebar/sidebar'
import Message from '../../components/message/message'
import JumpTo from '../../components/jumpTo/jumpTo'

import { MessageResponse, MessageData } from '../../types/messageData'
import { SearchFilters } from '../../types/searchFilters'

import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * View Component - Renders the Sidebar and Messages based on message data.
 * @returns {JSX.Element} View component.
 */
export default function View() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  const messageData: MessageResponse = location.state
  const renderLimit: number = 25

  // Search parameters
  const [contentQuery, setContentQuery] = useState('')
  const [authorQuery, setAuthorQuery] = useState('')

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
  }, [messageData, location, navigate])

  // Filter based on content search
  const filteredMessages = () => {
    return messageData.messages
      .filter((message: MessageData) => message.content.toLowerCase().includes(contentQuery.toLowerCase()))
      .filter((message: MessageData) => message.author.toLowerCase().includes(authorQuery.toLowerCase()))
      .slice(renderLimit * -1)
      .map((message: MessageData) => <Message key={message.id} {...message} />)
  }

  const filters: SearchFilters = {
    contentQuery: contentQuery,
    setContentQUery: setContentQuery,
    authorQuery: authorQuery,
    setAuthorQuery: setAuthorQuery,
  }

  return (
    <div className='view'>
      {loaded && (
        <>
          <Sidebar searchFilter={filters} guildName={messageData.guild_name} channelName={messageData.channel_name} />
          <div className='messages'>
            <span className='jump-anchor' ref={pageTop}></span>

            {filteredMessages()}

            <span className='jump-anchor' ref={pageBottom}></span>
          </div>

          {/* Jump to bottom/top button */}
          <JumpTo upRef={pageTop} downRef={pageBottom} />
        </>
      )}
    </div>
  )
}
