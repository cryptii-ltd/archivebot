import './auth.css'
import Logo from '../../components/logo/logo'
import MessageResponse from '../../types/messageData'

import { useState } from 'react'
import axios from 'axios'

export default function Auth() {
  const [passphrase, setPassphrase] = useState('')
  const [fetching, setFetching] = useState(false)
  const [archive, setArchive] = useState<MessageResponse>()

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassphrase(e.target.value.replace(/\s+/g, '-'))
  }

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return
    authenticate()
  }

  const authenticate = () => {
    setFetching(true)
    axios
      .get(`https://api.archive-bot.net/v1/messages/${passphrase}`)
      .then((response) => {
        setArchive(response.data)
        setFetching(false)
      })
      .catch(() => {
        setFetching(false)
      })
  }

  return (
    <div className='auth'>
      <div>
        <div className='logo'>
          <Logo />
        </div>
        <p>To view and decrypt your archive, you’ll need your passphrase</p>
        <input type='text' placeholder='Passphrase' value={passphrase} onChange={handleInputChange} onKeyUp={handleEnterPress} disabled={fetching} />

        {fetching && <span>pls wait</span>}
      </div>

      <span className='copyright'>© 2024 CRYPTII LTD | All Rights Reserved</span>
    </div>
  )
}
