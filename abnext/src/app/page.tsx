import Link from 'next/link'

export default async function Home() {
  return (
    <>
      <Link href={'/login'}>
        <button>Authenticate with Discord</button>
      </Link>
    </>
  )
}

