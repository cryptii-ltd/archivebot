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

  if (archive === null) {
    return <span>This archive does not exist</span>
  }

  if (archive.user_id != user.id) {
    return <span>You do not have permission to view this archive.</span>
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
