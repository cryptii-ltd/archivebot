import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { newSession, revokeSession, verifySession } from './_lib/session'

/**
 * Middleware function to handle authentication and session management based on the request path.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - Returns a Promise that resolves to a NextResponse object, handling redirections and session validation.
 * @description
 * This middleware function is responsible for handling authentication and session management. The following scenarios are handled:
 *
 * - If the request path is '/', and the request contains a code query parameter, it attempts to authenticate the user with the provided code.
 *   If the authentication fails, it redirects the user to the OAuth authorization URL.
 *   If the authentication succeeds, it sets the session cookie and redirects the user to '/archives'.
 *
 * - If the request path starts with '/archive', it verifies the session and redirects the user to the OAuth authorization URL if the session is invalid.
 *
 * - If the request path is '/logout', it revokes the session and redirects the user to '/'.
 */
export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const searchParams = request.nextUrl.searchParams

    // Handle authentication for the root path
    if (path === '/') {
        if (searchParams.get('code')) {
            // Attempt to authenticate the user with the provided code
            const accessToken = await newSession(searchParams.get('code') as string)

            if (!accessToken) {
                // If the authentication fails, redirect the user to the OAuth authorization URL
                return NextResponse.redirect(new URL(process.env.oAuth_url as string))
            }

            // If the authentication succeeds, set the session cookie and redirect the user to '/archives'
            const response = NextResponse.redirect(new URL('/archives', request.url))
            response.cookies.set('session', accessToken, {
                expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            })

            return response
        }
    }

    // Verify the session for any path that starts with '/archive'
    if (path.includes('/archive')) {
        const session = cookies().get('session')
        const validSession = await verifySession(session?.value as string)

        if (!validSession) {
            // If the session is invalid, redirect the user to the OAuth authorization URL
            const response = NextResponse.redirect(new URL(process.env.oAuth_url as string))
            return await revokeSession(response)
        }
    }

    // Handle logout
    if (path === '/logout') {
        // Revoke the session and redirect the user to '/'
        const response = NextResponse.redirect(new URL('/', request.url))
        return await revokeSession(response)
    }

    // If none of the above scenarios apply, simply return the next response
    return NextResponse.next()
}

