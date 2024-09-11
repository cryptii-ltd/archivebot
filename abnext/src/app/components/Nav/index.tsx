import style from './style.module.css'

import { cookies } from 'next/headers'
import Link from 'next/link'
import NavLink from '@/app/components/Nav/NavLink'
import Button from '@/app/components/Button'
import Brand from '@/app/components/Brand'
import MobileNav from './MobileNav'

import { FaDiscord } from 'react-icons/fa6'

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
  return (
    <nav
      className={`${style.nav} bg-nav text-sectionDarkText border-b border-glassSurfaceHighlightBorder backdrop-filter backdrop-blur-sm p-6 flex justify-between fixed inset-x-0 z-10`}
    >
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
          {cookies().get('session') && (
            <a href='/logout'>
              <Button type='secondary'>Log Out</Button>
            </a>
          )}
        </>

        <Link
          href={process.env.bot_invite_link as string}
          target='_blank'
        >
          <Button type='primary'>
            <FaDiscord size={24} />
            Get Started
          </Button>
        </Link>
      </div>

      <MobileNav links={navLinks}>
        <Link
          href={process.env.bot_invite_link as string}
          target='_blank'
          className='font-medium text-sectionDarkTextSecondary capitalize transition ease hover:text-sectionDarkText'
        >
          Get Started
        </Link>
        <>
          {cookies().get('session') && (
            <a
              href='/logout'
              className='font-medium text-sectionDarkTextSecondary capitalize transition ease hover:text-sectionDarkText'
            >
              Log Out
            </a>
          )}
        </>
      </MobileNav>
    </nav>
  )
}
