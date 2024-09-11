import style from './style.module.css'

import { cookies } from 'next/headers'
import Link from 'next/link'
import NavLink from '@/app/components/Nav/NavLink'
import Button from '@/app/components/Button'
import Brand from '@/app/components/Brand'
import MobileNav from './MobileNav'
import UserDropdown from './UserDropdown'
import getUserDetails from '@/_lib/user'

const navLinks = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Features',
    link: '/#features',
  },
  {
    name: 'Plans',
    link: '/#plans',
  },
]

/**
 * The navigation bar component.
 *
 * @returns A JSX element representing the navigation bar.
 */
export async function Nav() {
  const sessionCookie = cookies().get('session')
  const user = await getUserDetails(sessionCookie?.value as string)

  return (
    <nav
      className={`${style.nav} flex items-center justify-center px-6 py-4 fixed inset-x-0 z-10 bg-nav text-text border-b border-grey-500 backdrop-filter backdrop-blur-sm`}
    >
      <div className='flex items-center justify-between max-w-[100rem] m-auto w-full'>
        <div className='flex items-center justify-start gap-[64px]'>
          <Brand />
          <div className={`${style.links} flex items-center justify-start gap-6`}>
            <>
              {Object.entries(navLinks).map(([index, link]) => (
                <NavLink
                  key={index}
                  href={link.link}
                >
                  {link.name}
                </NavLink>
              ))}
            </>
          </div>
        </div>

        <div className={`${style.buttons} flex items-center justify-end gap-2`}>
          <>
            {sessionCookie ? (
              <UserDropdown user={user} />
            ) : (
              <a href={process.env.oAuth_url as string}>
                <Button type='secondary'>Sign In</Button>
              </a>
            )}
          </>
        </div>

        <MobileNav links={navLinks}>
          <Link
            href={process.env.bot_invite_link as string}
            target='_blank'
            className='font-medium text-textSecondary capitalize transition ease hover:text-text'
          >
            Get ArchiveBot
          </Link>
          <>
            {sessionCookie ? (
              <UserDropdown
                user={user}
                mobile
              />
            ) : (
              <NavLink href={process.env.oAuth_url as string}>Sign In</NavLink>
            )}
          </>
        </MobileNav>
      </div>
    </nav>
  )
}
