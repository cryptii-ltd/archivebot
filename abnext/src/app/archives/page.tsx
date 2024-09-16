import { cookies } from 'next/headers'
import Link from 'next/link'
import getUserDetails from '@/_lib/user'
import { getArchives } from '@/_lib/archive'
import DeleteArchive from '@/app/archives/DeleteArchive'
import Section from '@/app/components/Section'

import { LuMessagesSquare } from 'react-icons/lu'
import { FiArrowRight } from 'react-icons/fi'
import PageBadge from '../components/PageBadge'
import NavLink from '../components/Nav/NavLink'

/**
 * Page to list archives associated with the currently authenticated user.
 *
 * If the user is not authenticated, redirects to the root path.
 *
 * @returns The page component.
 */
export default async function Archives() {
  const userData = await getUserDetails(cookies().get('session')!.value as string)
  const archives = await getArchives(userData.id)

  return (
    <main className='mt-[81px]'>
      <Section
        titleBadge={
          <PageBadge>
            <LuMessagesSquare size={24} />
            Archives
          </PageBadge>
        }
      >
        {archives.length > 0 ? (
          <div className='flex flex-col gap-2 justify-start'>
            {archives.map(archive => (
              <div
                key={archive.id}
                className='flex flex-row flex-wrap flex-1 items-center justify-between gap-2 border border-grey-500 p-4 rounded-xl'
              >
                {archive.name}{' '}
                <div className='grid grid-cols-2 items-center justify-end gap-2'>
                  <DeleteArchive archiveId={archive.id} />

                  <Link href={`/archives/${userData.id}/${archive.uuid}`}>
                    <FiArrowRight
                      size={24}
                      className='cursor-pointer hover:text-accent transition ease duration-75'
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span>
            You don&apos;t currently have any archives.
            <br />
            <a
              href={process.env.bot_invite_link}
              target='_blank'
              className='text-accent'
            >
              Invite the bot
            </a>{' '}
            to your Discord server and start archiving!
          </span>
        )}
      </Section>
    </main>
  )
}
