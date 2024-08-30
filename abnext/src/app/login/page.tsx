import { redirect } from 'next/navigation'
import { getAccessToken } from './actions'

export default async function Login({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const code = searchParams.code as string
  if (!code) redirect(process.env.oAuth_url as string)

  await getAccessToken(code)
}
