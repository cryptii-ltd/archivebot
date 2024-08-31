'use server'

import getUserDetails from './user'
import { NextResponse } from 'next/server'

export async function newSession(authCode: string) {
    if (!authCode) return false

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

    if (response.status != 200) return false

    const oAuthData = await response.json()
    return oAuthData.access_token
}

export async function revokeSession(response: NextResponse) {
    response.cookies.delete('session')
    return response
}

export async function verifySession(accessToken: string) {
    if (!accessToken) return false
    if (await getUserDetails(accessToken)) return true
    return false
}