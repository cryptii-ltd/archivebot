/* eslint-disable indent */ // <-- Workaround just for this file, since eslint seems to shit itself in the axios catch block.
import style from './index.module.css'
import Logo from '../../components/Logo'
import { MessageResponse } from '../../types/messageData'
import { IconLoader2 } from '@tabler/icons-react'

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

/**
 * Auth Component - Handles user authentication and passphrase input.
 * @returns {JSX.Element} Auth component.
 */
export default function Auth(): JSX.Element {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [passphrase, setPassphrase] = useState(params.get('passphrase') ?? '')
  const [fetching, setFetching] = useState(false)
  const [archive, setArchive] = useState<MessageResponse>()
  const [fetchFailed, setFetchFailed] = useState(false)
  const [failReason, setFailReason] = useState('')

  /**
   * Redirects to the '/view' route when archive data is available.
   */
  useEffect(() => {
    if (!passphrase) return
    authenticate()

    if (!archive) return

    navigate('/view', { state: archive })
  }, [navigate, archive])

  /**
   * Handles input change for passphrase.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassphrase(e.target.value.replace(/\s+/g, '-'))
  }

  /**
   * Handles key press events for the passphrase input.
   * Initiates authentication when the 'Enter' key is pressed.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    authenticate()
  }

  /**
   * Initiates the authentication process by fetching the user's archive data.
   */
  const authenticate = () => {
    setFetching(true)
    axios
      .get(`https://api.archive-bot.net/v1/messages/${passphrase}`)
      .then((response) => {
        setArchive(response.data)
        setFetchFailed(false)
      })
      .catch((response) => {
        setFetching(false)
        setFetchFailed(true)

        switch (response.request.status) {
          case 401:
            setFailReason('Invalid credentials.\nCheck your passphrase and try again.')
            break

          default:
            setFailReason(response.request.statusText)
            break
        }
      })
  }

  return (
    <div className={style.auth}>
      <div>
        <div className={style.logo}>
          <Logo />
        </div>

        <p>To view and decrypt your archive, you&apos;ll need your passphrase</p>

        {fetching ? (
          <span className={style.loader}>
            <IconLoader2
              size={24}
              stroke={1.5}
            />
            <span>We&apos;re fetching your archive now...</span>
          </span>
        ) : (
          <>
            <input
              type='text'
              placeholder='Passphrase'
              value={passphrase}
              onChange={handleInputChange}
              onKeyUp={handleEnterPress}
              disabled={fetching}
            />
            {fetchFailed && <span className={style.errorText}>{failReason}</span>}
          </>
        )}
      </div>

      <span className='copyright'>© {new Date().getFullYear()} CRYPTII | All Rights Reserved</span>
    </div>
  )
}
