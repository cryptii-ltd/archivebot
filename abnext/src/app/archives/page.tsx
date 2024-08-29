import { redirect } from 'next/navigation'
import { getAccessToken, getArchives, getMessageCount, getUserDetails } from './actions'

export default async function Archives({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const code = searchParams.code as string
  const accessToken = await getAccessToken(code)

  if (!accessToken) redirect('/')

  const userData = await getUserDetails(accessToken)
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
    </>
  )
}
