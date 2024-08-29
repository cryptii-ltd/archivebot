import Link from 'next/link'

export default async function Home() {
  return (
    <>
      <Link href={process.env.oAuth_url as string}>
        <button>Authenticate with Discord</button>
      </Link>
    </>
  )
}

