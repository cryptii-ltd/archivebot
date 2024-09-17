import Link from 'next/link'
import { getArchives } from '@/_lib/archive'

import DeleteArchive from './DeleteArchive'

import { FiArrowRight } from 'react-icons/fi'

export default async function Archives({ userId }: { userId: string }) {
  const archives = await getArchives(userId)

  return (
    <>
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

                <Link href={`/archives/${userId}/${archive.uuid}`}>
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
    </>
  )
}

