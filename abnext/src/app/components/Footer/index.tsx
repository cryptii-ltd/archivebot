import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div>
        <span>
          Join Our <Link href='https://discord.gg/tPszrpjA'>Discord Server</Link>
        </span>
      </div>

      <div>
        <span>
          <Link href='/'>Home</Link>
          <Link href='/archives'>Archives</Link>
          <Link href='/privacy-policy'>Privacy Policy</Link>
        </span>
      </div>

      <div>
        <span>Privacy Policy applies as per Discord&apos;s rules.</span>
      </div>

      <div>
        <span>Logo</span>
        <span>Your Discord history, always within reach</span>
        <span>Copyright © {new Date().getFullYear()} Archive Bot. All rights reserved.</span>
      </div>
    </footer>
  )
}
