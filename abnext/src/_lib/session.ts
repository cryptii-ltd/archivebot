'use server'

import getUserDetails from './user'
import { NextResponse } from 'next/server'

/**
 * Creates a new session by exchanging the provided authorization code for an access token.
 *
 * @param {string} authCode - The authorization code received from the OAuth2 provider.
 * @returns {Promise<string | false>} - The access token if successful, otherwise `false`.
 */
export async function newSession(authCode: string): Promise<string | false> {
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

/**
 * Revokes an existing session by deleting the session cookie.
 *
 * @param {NextResponse} response - The Next.js server response object.
 * @returns {Promise<NextResponse>} - The updated response object with the session cookie removed.
 */
export async function revokeSession(response: NextResponse): Promise<NextResponse> {
    response.cookies.delete('session')
    return response
}

/**
 * Verifies if the provided access token is valid by checking user details.
 *
 * @param {string} accessToken - The access token to verify.
 * @returns {Promise<boolean>} - `true` if the session is valid, otherwise `false`.
 */
export async function verifySession(accessToken: string): Promise<boolean> {
    if (!accessToken) return false
    if (await getUserDetails(accessToken)) return true
    return false
}