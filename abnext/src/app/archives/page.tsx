import getUserDetails from '@/_lib/user'
import { getArchives, getMessageCount } from '@/_lib/archive'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LogOut from './LogOut'

export default async function Archives() {
  const accessToken = cookies().get('session')?.value

  if (!accessToken) redirect('/')

  const userData = await getUserDetails(accessToken as string)
  const archives = await getArchives(userData.id)
  console.log(userData.id)

  return (
    <>
      {archives.length > 0 ? (
        <ul>
          {archives.map(archive => (
            <li key={archive.id}>
              {new Date(archive.created_at).toLocaleString()} - {archive.name} - {getMessageCount(archive.id)} messages
            </li>
          ))}
        </ul>
      ) : (
        <span>No archives found...</span>
      )}

      <LogOut />
    </>
  )
}
