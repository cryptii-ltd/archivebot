import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { newSession, revokeSession, verifySession } from './_lib/session'

/**
 * Middleware function to handle authentication and session management based on the request path.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - Returns a Promise that resolves to a NextResponse object, handling redirections and session validation.
 */
export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const searchParams = request.nextUrl.searchParams

    if (path === '/') {
        if (searchParams.get('code')) {
            const accessToken = await newSession(searchParams.get('code') as string)
            if (!accessToken) return NextResponse.redirect(new URL(process.env.oAuth_url as string))

            const response = NextResponse.redirect(new URL('/archives', request.url))
            response.cookies.set('session', accessToken, {
                expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            })

            return response
        }
    }

    if (path.includes('/archive')) {
        const session = cookies().get('session')
        const validSession = await verifySession(session?.value as string)
        if (!validSession) {
            const response = NextResponse.redirect(new URL(process.env.oAuth_url as string))
            return await revokeSession(response)
        }
    }

    if (path === '/logout') {
        const response = NextResponse.redirect(new URL('/', request.url))
        return await revokeSession(response)
    }

    return NextResponse.next()
}
