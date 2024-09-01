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
    const session = cookies().get('session')

    switch (path) {
        case '/':
            if (searchParams.get('code')) {
                const accessToken = await newSession(searchParams.get('code') as string)
                if (!accessToken) return NextResponse.redirect(new URL(process.env.oAuth_url as string))

                const response = NextResponse.redirect(new URL('/archives', request.url))
                response.cookies.set('session', accessToken)
                return response
            }
            break

        case '/archives':
            const validSession = await verifySession(session?.value as string)
            if (!validSession) {
                const response = NextResponse.redirect(new URL('/', request.url))
                return await revokeSession(response)
            }
            break

        case '/logout':
            const response = NextResponse.redirect(new URL('/', request.url))
            return await revokeSession(response)

        default:
            break
    }

    return NextResponse.next()
}
