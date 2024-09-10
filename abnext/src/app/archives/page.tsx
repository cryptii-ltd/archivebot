import { cookies } from 'next/headers'
import Link from 'next/link'
import getUserDetails from '@/_lib/user'
import { getArchives } from '@/_lib/archive'
import DeleteButton from './deleteButton'
import Button from '@/app/components/Button'

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
      <>
        {archives.length > 0 ? (
          <div className='grid gap-4'>
            {archives.map(archive => (
              <div
                key={archive.id}
                className='flex items-center justify-start gap-2'
              >
                {archive.name}{' '}
                <Link href={`/archives/${userData.id}/${archive.uuid}`}>
                  <Button>View</Button>
                </Link>
                <DeleteButton archiveId={archive.id} />
              </div>
            ))}
          </div>
        ) : (
          <span>
            You don&apos;t currently have any archives. <Link href={'/invite'}>Invite the bot</Link> to your discord
            server and start archiving!
          </span>
        )}
      </>
    </main>
  )
}
