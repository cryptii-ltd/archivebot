import { cookies } from 'next/headers'
import Link from 'next/link'
import getUserDetails from '@/_lib/user'
import { getArchives } from '@/_lib/archive'
import DeleteButton from '@/app/archives/DeleteButton'
import Button from '@/app/components/Button'
import Section from '@/app/components/Section'

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
    <main className='mt-[96px]'>
      <Section>
        {archives.length > 0 ? (
          <div className='flex flex-col gap-4 justify-start'>
            {archives.map(archive => (
              <div
                key={archive.id}
                className='flex flex-row flex-wrap items-center justify-between gap-2'
              >
                {archive.name}{' '}
                <div className='grid grid-cols-2 items-center justify-end gap-2'>
                  <DeleteButton archiveId={archive.id} />

                  <Link href={`/archives/${userData.id}/${archive.uuid}`}>
                    <Button className='w-full'>View</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span>
            You don&apos;t currently have any archives. <Link href={'/invite'}>Invite the bot</Link> to your discord
            server and start archiving!
          </span>
        )}
      </Section>
    </main>
  )
}

