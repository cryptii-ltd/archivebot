import { cookies } from 'next/headers'
import Link from 'next/link'

/**
 * Home page of the app. Redirects to the archives page if the user is signed in, otherwise
 * shows a sign in button.
 */
export default async function Home() {
  const session = cookies().get('session')

  return (
    <>
      {session ? (
        <Link href={'/archives'}>View archives</Link>
      ) : (
        <Link href={process.env.oAuth_url as string}>
          <button>Sign In</button>
        </Link>
      )}
    </>
  )
}

