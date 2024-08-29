import prisma from "@/lib/prisma";

export async function getArchives(userID: string) {
    const archives = await prisma.archives.findMany({
        where: {
            user_id: userID
        }
    })

    return archives
}

export async function getAccessToken(authCode: string) {
    const payload = new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode as string,
        redirect_uri: 'http://localhost:3000/archives',
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
    return oAuthData.access_token
}
export async function revokeAccessToken(accessToken: string) {
    const payload = new URLSearchParams({
        token: accessToken
    })

    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    await fetch('https://discord.com/api/v10/oauth2/token', {
        method: 'POST',
        body: payload,
        headers: headers,
    })
}

export async function getUserDetails(accessToken: string) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    }

    const response = await fetch('https://discord.com/api/users/@me', { headers: headers })

    if (response.status != 200) return

    const userData = await response.json()
    return userData
}