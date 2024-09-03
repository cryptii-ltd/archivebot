import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import getUserDetails from '@/_lib/user'
import { getArchives } from '@/_lib/archive'
import DeleteButton from './deleteButton'

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
    <>
      {archives.length > 0 ? (
        <ul>
          {archives.map(archive => (
            <li key={archive.id}>
              {archive.name}{' '}
              <Link href={`/archives/${userData.id}/${archive.uuid}`}>
                <button>View</button>
              </Link>
              <DeleteButton archiveId={archive.id} />
            </li>
          ))}
        </ul>
      ) : (
        <span>
          You don&apos;t currently have any archives. <Link href={'/invite'}>Invite the bot</Link> to your discord
          server and start archiving!
        </span>
      )}

      <Link
        href={'/logout'}
        prefetch={false}
      >
        <button>Log Out</button>
      </Link>
    </>
  )
}

