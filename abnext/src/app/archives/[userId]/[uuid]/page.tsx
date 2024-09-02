import { cookies } from 'next/headers'
import getMessages, { getArchive } from '@/_lib/archive'
import getUserDetails from '@/_lib/user'

/**
 * Archive Page
 *
 * This page displays a list of all messages in an archive.
 *
 * @param {Object} props - Page props
 * @param {Object} props.params - URL parameters
 * @param {string} props.params.userId - User ID
 * @param {string} props.params.uuid - Archive UUID
 * @param {Object} [props.searchParams] - Search parameters
 */
export default async function Archive({
  params,
  searchParams,
}: {
  params: { userId: string; uuid: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  // Get the archive
  const archive = await getArchive(params.userId, params.uuid)
  const user = await getUserDetails(cookies().get('session')?.value as string)

  // If the archive does not exist, or the user does not have permission to view it, return a error message
  if (archive === null || archive.user_id != user.id) {
    return <span>This archive either does not exist, or you do not have permission to view it.</span>
  }

  // Get the messages in the archive
  const messages = await getMessages(archive.id, 'asc')

  // Return the list of messages
  return (
    <>
      {messages.map(message => (
        <p key={message.message_id}>{JSON.parse(message.content).content}</p>
      ))}
    </>
  )
}
