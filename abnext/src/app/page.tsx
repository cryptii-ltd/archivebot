'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { newSession } from '@/_lib/session'
import { getCookie } from 'cookies-next'
import LogOut from './archives/LogOut'

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [code, setCode] = useState<string | undefined>()

  const handleAuth = async () => {
    await newSession(code as string)
  }

  useEffect(() => {
    if (searchParams.code) setCode(searchParams.code as string)
  }, [])

  useEffect(() => {
    if (code) handleAuth()
  }, [code])

  return (
    <>
      {getCookie('session') ? (
        <>
          <Link href={'/archives'}>View archives</Link>
          <LogOut />
        </>
      ) : (
        <button onClick={handleAuth}>Authenticate with Discord</button>
      )}
    </>
  )
}
