import { Suspense } from 'react'
import { cookies } from 'next/headers'
import getUserDetails from '@/_lib/user'

import Section from '@/app/components/Section'
import Archives from './Archives'
import Loading from './Loading'

import { LuMessagesSquare } from 'react-icons/lu'
import PageBadge from '@/app/components/PageBadge'

/**
 * Page to list archives associated with the currently authenticated user.
 *
 * If the user is not authenticated, redirects to the root path.
 *
 * @returns The page component.
 */
export default async function ArchivesPage() {
  const userData = await getUserDetails((await cookies()).get('session')!.value as string)

  return (
    <main className='mt-[81px]'>
      <Section
        titleBadge={
          <PageBadge>
            <LuMessagesSquare size={24} />
            Archives
          </PageBadge>
        }
      >
        <Suspense fallback={<Loading />}>
          <Archives userId={userData.id} />
        </Suspense>
      </Section>
    </main>
  )
}

