import Link from 'next/link'
import Section from '@/app/components/Section'
import PageBadge from '@/app/components/PageBadge'
import NavLink from '@/app/components/Nav/NavLink'

import { LuMessagesSquare } from 'react-icons/lu'

/**
 * Page for Frequently Asked Questions
 *
 * @remarks
 * This page contains a list of Frequently Asked Questions about ArchiveBot.
 * The questions are about how to use the bot, what the bot does, and how secure
 * user data is. The page also includes links to the plans page and the discord
 * server invite link.
 * @returns React component
 */
export default async function TermsOfUse() {
  return (
    <main className='mt-[81px]'>
      <Section
        titleBadge={
          <PageBadge>
            <LuMessagesSquare size={24} />
            Frequently Asked Questions
          </PageBadge>
        }
      >
        <ol className='max-w-[120ch] list-none grid gap-8'>
          <li>
            <span className='text-3xl font-semibold'>What does ArchiveBot do?</span>
            <p className='mt-1'>
              ArchiveBot allows you to easily archive, organize, and securely share your Discord server messages. You
              can manage your archived conversations, rename them, delete them, or share them with password protection.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>How do I archive my messages?</span>
            <p className='mt-1'>
              Simply use the{' '}
              <code className='bg-accent text-sectionDarkText text-sm font-medium p-1 rounded-md ms-1 me-1'>
                /archive
              </code>{' '}
              slash command in any Discord channel to archive your messages. You can also archive entire servers with
              certain subscription plans.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>What are the storage limits for each plan?</span>
            <p className='mt-1'>
              Check out our plans <NavLink href='/#plans'>here</NavLink>.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Can I share my archives?</span>
            <p className='mt-1'>
              Yes! You can share your archives via a public link, and you have the option to password-protect shared
              archives for added security.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>How secure is my data?</span>
            <p className='mt-1'>
              We take security seriously. Your archived messages are stored securely and are only accessible by you,
              unless you choose to share them with others. We also provide password protection for shared archives.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>What happens if I delete an archive?</span>
            <p className='mt-1'>
              When you delete an archive, it&apos;s marked as deleted but not immediately removed. The archive remains
              stored on our servers and will only be fully removed if we need the space. This measure helps prevent
              abuse of our platform, as we&apos;ve encountered in the past.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>Do you track my activity or use my data for advertising?</span>
            <p className='mt-1'>
              No, we do not track your activity or use your data for advertising. We only store cookies for
              authentication purposes.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>What happens if Discord requests my data?</span>
            <p className='mt-1'>
              We comply with requests from Discord or authorized third-party authorities to share or remove user data as
              required by law or Discord’s policies.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>What happens if I cancel my paid subscription?</span>
            <p className='mt-1'>
              If you cancel your subscription, you will lose access to higher-tier features and revert to the limits of
              the <span className='font-bold'>Basic</span> plan. Your existing archives will remain intact, but you may
              no longer create new ones above the <span className='font-bold'>Basic</span> plan limits.
            </p>
          </li>

          <li>
            <span className='text-3xl font-semibold'>How do I contact support?</span>
            <p className='mt-1'>
              For support, join our{' '}
              <Link
                href={process.env.server_invite_link as string}
                className='text-accent'
              >
                Discord Server
              </Link>{' '}
              and reach out in the appropriate support channel.
            </p>
          </li>
        </ol>
      </Section>
    </main>
  )
}
