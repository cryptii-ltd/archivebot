import Link from 'next/link'
import Section from '@/app/components/Section'

/**
 * @function TermsOfUse
 * @description The privacy policy page for ArchiveBot.
 * @returns {JSX.Element} The privacy policy page.
 * @example
 * <TermsOfUse />
 */
export default async function TermsOfUse() {
  return (
    <main className='mt-[81px]'>
      <Section
        subtitle='Privacy Policy'
        extra={<p className='text-sectionDarkTextSecondary'>Last updated September 2024</p>}
      >
        <ol className='max-w-[120ch] list-none grid gap-8'>
          <li>
            <span className='text-3xl font-semibold'>Data We Collect</span>
            <ul className='mt-1 ms-8'>
              <li>
                <b>User Data: </b>User IDs and usernames for identifying archive ownership.
              </li>

              <li>
                <b>Server Data: </b>Server IDs, server names, and channel names for managing archived content.
              </li>

              <li>
                <b>Archived Messages: </b>Content of messages, including text, media, author IDs, and timestamps, which
                are stored for archival purposes.
              </li>

              <li>
                <b>Avatar Hashes: </b>Used to display the correct avatars in the archived content interface.
              </li>
            </ul>

            <p className='mt-2'>
              We do not collect personal information beyond what is accessible via Discord&apos;s API.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>How We Use Your Data</span>
            <p className='mt-1'>We use the collected data to:</p>

            <ul className='mt-2 ms-8'>
              <li>Provide our archive service.</li>
              <li>Allow users to view, manage, and share their archived messages.</li>
              <li>Enable security features like password-protected sharing of archives.</li>
            </ul>

            <p className='mt-2'>
              We may also use the data for internal analytics to improve our services but will not sell or share your
              data with third parties outside of those mentioned in this policy.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Data Retention</span>
            <p className='mt-1'>
              We retain your archived messages and related data indefinitely unless you delete the archive. Even if
              deleted, we reserve the right to retain the data in a &quot;deleted&quot; state. This measure helps
              prevent abuse of our platform, as we&apos;ve encountered in the past. However, deleted archives are
              removed from our systems when space is required, and users cannot access these deleted archives.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Data Sharing</span>
            <ul className='mt-1 ms-8'>
              <li>
                <b>Discord and Third Parties: </b>We comply with requests from Discord or authorized third-party
                authorities to share or remove user data when required by law or policy violations.
              </li>

              <li>
                <b>Third-Party Platforms: </b>Our payment services are handled by Patreon, and they handle all
                payment-related information. We do not store or have access to your payment data.
              </li>
            </ul>

            <p className='mt-2'>
              We do not integrate with or share data with any third-party services outside of the ones necessary for the
              functionality of ArchiveBot.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>User Rights</span>
            <ul className='mt-1 ms-8'>
              <li>
                <b>Access and Control: </b>You can access your data and manage your archives via our platform. You are
                also able to delete archives at any time.
              </li>

              <li>
                <b>Data Requests: </b>Users can request data deletion or correction by contacting us, though we may
                retain records as needed for legal and operational purposes.
              </li>
            </ul>

            <p className='mt-2'>
              We do not integrate with or share data with any third-party services outside of the ones necessary for the
              functionality of ArchiveBot.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Security</span>
            <p className='mt-1'>
              We are committed to securing your data and use reasonable security measures to prevent unauthorized
              access, alteration, disclosure, or destruction of your archives. However, we cannot guarantee the security
              of your data due to limitations such as Discord&apos;s API and our reliance on external services.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Cookies</span>
            <p className='mt-1'>
              We only store cookies for authentication purposes. We do not use cookies for tracking, advertising, or any
              other purposes.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Changes to This Policy</span>
            <p className='mt-1'>
              We reserve the right to update or modify this Privacy Policy at any time. Changes will be posted on this
              page with the updated effective date.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Contact Us</span>
            <p className='mt-1'>
              For any questions regarding these Terms of Use, please reach out to us through our{' '}
              <Link
                href={process.env.server_invite_link as string}
                className='text-accent'
                target='_blank'
              >
                Discord server
              </Link>
              .
            </p>
          </li>
        </ol>
      </Section>
    </main>
  )
}
