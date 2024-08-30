'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function newSession(authCode: string) {
    if (!authCode) redirect(process.env.oAuth_url as string)

    const payload = new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode as string,
        redirect_uri: 'http://localhost:3000',
        client_id: process.env.client_id as string,
        client_secret: process.env.client_secret as string,
    })

    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    let response = await fetch('https://discord.com/api/v10/oauth2/token', {
        method: 'POST',
        body: payload,
        headers: headers,
    })

    if (response.status != 200) redirect('/')

    const oAuthData = await response.json()
    cookies().set('session', oAuthData.access_token)

    redirect('/archives')
}

export async function revokeSession() {
    cookies().delete('session')
    redirect('/')
}
