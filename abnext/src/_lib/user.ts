/**
 * Fetches the details of the authenticated user from Discord using the provided access token.
 *
 * @param {string} accessToken - The OAuth2 access token used for authenticating the request.
 * @returns {Promise<Object|boolean>} - Returns a Promise that resolves to the user data object if successful, or `false` if the request fails.
 */
export default async function getUserDetails(accessToken: string) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    }

    const response = await fetch('https://discord.com/api/users/@me', { headers: headers })

    if (response.status != 200) return false

    const userData = await response.json()
    return userData
}
