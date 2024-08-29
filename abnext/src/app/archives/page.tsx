import { redirect } from 'next/navigation'
import { getAccessToken, getArchives, getUserDetails } from './actions'

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
          {archives.map((archive) => (
            <li key={archive.id}>{archive.name}</li>
          ))}
        </ul>
      ) : (
        <span>No archives found...</span>
      )}
    </>
  )
}

