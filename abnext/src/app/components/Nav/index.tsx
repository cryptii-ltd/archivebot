import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <div>
        <div>
          <span>Logo</span>
          <span>ArchiveBot</span>
        </div>

        <Link href=''>Home</Link>
        <Link href=''>Features</Link>
        <Link href=''>Pricing</Link>
      </div>

      <Link href='/archives'>
        <button>Get Started</button>
      </Link>
    </nav>
  )
}
