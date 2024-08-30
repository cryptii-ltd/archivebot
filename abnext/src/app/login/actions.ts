import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getAccessToken(authCode: string) {
    const payload = new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode as string,
        redirect_uri: 'http://localhost:3000/login',
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

    if (response.status != 200) return

    const oAuthData = await response.json()
    cookies().set('token', oAuthData.access_token)
    redirect('/archives')
}
// export async function revokeAccessToken(accessToken: string) {
//     const payload = new URLSearchParams({
//         token: accessToken
//     })

//     let headers = {
//         'Content-Type': 'application/x-www-form-urlencoded',
//     }

//     await fetch('https://discord.com/api/v10/oauth2/token', {
//         method: 'POST',
//         body: payload,
//         headers: headers,
//     })
// }