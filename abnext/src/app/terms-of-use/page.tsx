import Link from 'next/link'
import Section from '@/app/components/Section'

/**
 * Page for displaying the Terms of Use of ArchiveBot.
 *
 * Contains the complete text of the Terms of Use, including sections on acceptance of terms, compliance with Discord's
 * policies, archiving and data retention, service limitations, paid plans and payment handling, user conduct, data
 * responsibility, service termination, modifications to terms, and contact information.
 */
export default async function TermsOfUse() {
  return (
    <main className='mt-[81px]'>
      <Section
        subtitle='Terms of Use'
        extra={<p className='text-sectionDarkTextSecondary'>Last updated September 2024</p>}
      >
        <ol className='max-w-[120ch] list-none grid gap-8'>
          <li>
            <span className='text-3xl font-semibold'>Acceptance of terms</span>
            <p className='mt-1'>
              By using ArchiveBot, you agree to comply with these Terms of Use. If you do not agree, you may not use our
              service. Your continued use of ArchiveBot constitutes acceptance of these terms.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Compliance with Discord&apos;s Policies</span>
            <p className='mt-1'>
              All users must comply with Discord&apos;s{' '}
              <Link
                href='https://discord.com/terms'
                className='text-accent'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='https://discord.com/guidelines'
                className='text-accent'
              >
                Community Guidelines
              </Link>
              . ArchiveBot users are responsible for the content they store and archive, and any violation of Discord’s
              policies may result in your account being banned from using ArchiveBot.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Archiving and Data Retention</span>
            <ul className='mt-1 ms-8'>
              <li>
                <b>Archive Limitations: </b>Based on your plan, there are different limits to the number of messages and
                archives you can store.
              </li>
            </ul>

            <ul className='mt-1 ms-8'>
              <li>
                <b>Data Retention: </b>Archived content is stored indefinitely. This measure helps prevent abuse of our
                platform, as we&apos;ve encountered in the past. Even if you delete an archive, we reserve the right to
                retain the data, removing it from our servers as needed for space management. Deleted archives will not
                be accessible to users once removed.
              </li>
            </ul>

            <ul className='mt-1 ms-8'>
              <li>
                <b>Server-Wide Archives: </b>Certain plans offer the ability to archive entire Discord servers in bulk
                instead of archiving channel by channel.
              </li>
            </ul>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Service Limitations</span>
            <p className='mt-1'>
              ArchiveBot’s functionality relies on Discord&apos;s API. Service availability may be impacted by
              Discord&apos;s API performance, server load, or other technical limitations. We strive to maintain the
              highest level of service but cannot guarantee constant availability or data retrieval in case of technical
              issues.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Paid Plans and Payment Handling</span>
            <ul className='mt-1 ms-8'>
              <li>
                <b>Subscription Services: </b>ArchiveBot offers several paid subscription tiers, each with varying
                levels of service. These payments are handled by Patreon, and any billing-related concerns should be
                addressed directly with them.
              </li>

              <li>
                <b>Refunds and Cancellations: </b>Refunds and cancellations for paid plans are subject to Patreon&apos;s
                policies. However, CRYPTII LTD reserves the right to offer refunds or promotions at its discretion.
              </li>
            </ul>
          </li>

          <li>
            <span className='text-3xl font-semibold'>User Conduct</span>
            <p className='mt-1'>By using ArchiveBot, you agree not to:</p>

            <ul className='mt-2 ms-8'>
              <li>Archive content that violates Discord&apos;s policies or local laws</li>

              <li>
                Use the bot in ways that could damage, disable, or overload our infrastructure or Discord&apos;s
                infrastructure.
              </li>
            </ul>

            <p className='mt-2'>
              We reserve the right to remove access to ArchiveBot, delete your archives, or ban you from the service if
              you violate these terms.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Data Responsibility</span>
            <p className='mt-1'>
              We are not responsible for the content archived by users. If requested by Discord or a third-party
              authority, we will comply with requests to share or delete user data. CRYPTII LTD will not be held liable
              for any legal consequences resulting from the content you store using ArchiveBot.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Service Termination</span>
            <p className='mt-1'>
              We reserve the right to suspend or terminate your access to ArchiveBot at any time for violations of these
              terms, abuse of the service, or any other reason at our discretion.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Modifications to Terms</span>
            <p className='mt-1'>
              We may update or change these Terms of Use at any time without prior notice. Users are responsible for
              reviewing the Terms periodically for any changes. Continued use of the service constitutes acceptance of
              any changes.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Contact Information</span>
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
