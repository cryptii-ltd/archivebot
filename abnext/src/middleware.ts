import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { newSession, revokeSession, verifySession } from './_lib/session'

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

        default:
            break
    }

    return NextResponse.next()
}