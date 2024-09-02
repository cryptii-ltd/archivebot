import Link from 'next/link'

/**
 * Home page of the app.
 */
export default async function Home() {
  return (
    <Link href={'/archives'}>
      <button>View Archives</button>
    </Link>
  )
}
