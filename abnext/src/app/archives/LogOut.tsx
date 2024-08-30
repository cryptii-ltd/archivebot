'use client'

import { revokeSession } from '@/_lib/session'

export default function LogOut() {
  const handleClick = async () => {
    await revokeSession()
  }

  return <button onClick={handleClick}>Log Out</button>
}
