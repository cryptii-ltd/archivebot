import Link from 'next/link'

/**
 * Home page of the app.
 */
export default async function Home() {
  return (
    <main>
      <h1>Save and Share Your Discord Chats with Ease</h1>
      <h2>Quickly archive, organize, and securely share your favorite conversations.</h2>

      <section>
        <h3>Features</h3>
        <div>
          <div>Simple Archiving</div>
          <p>Just use a slash command to save your Discord chats — it's that easy.</p>
        </div>

        <div>
          <div>Access Anytime</div>
          <p>Sign in with Discord to view and manage all your archives in one spot.</p>
        </div>

        <div>
          <div>Sleek Interface</div>
          <p>Browse your saved conversations in a clean and easy-to-use interface.</p>
        </div>

        <div>
          <div>Organize with Ease</div>
          <p>Rename, delete, and keep your archives neat and tidy.</p>
        </div>

        <div>
          <div>Share Securely</div>
          <p>Want to share? You can add password protection for extra security.</p>
        </div>
      </section>

      <section>
        <h3>Start Archiving Now—Keep Your Discord Memories Safe and Easy to Share!</h3>

        <Link href={'/archives'}>
          <button>View Archives</button>
        </Link>
      </section>

      <section>
        <div>150,000+ Users Served</div>
        <div>2.5 million+ Total Archives</div>
        <div>300 million+ Messages Archived</div>
        <div>20,000+ Servers Secured</div>

        <i>Your Discord history, always within reach.</i>
      </section>
    </main>
  )
}
