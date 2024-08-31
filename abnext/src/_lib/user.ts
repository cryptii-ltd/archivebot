export default async function getUserDetails(accessToken: string) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    }

    const response = await fetch('https://discord.com/api/users/@me', { headers: headers })

    if (response.status != 200) return false

    const userData = await response.json()
    return userData
}
