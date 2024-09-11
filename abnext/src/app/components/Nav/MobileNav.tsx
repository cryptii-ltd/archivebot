'use client'

import style from './style.module.css'

import { useState } from 'react'
import NavLink from '@/app/components/Nav/NavLink'

interface MobileNavProps {
  links: { name: string; link: string }[]
  children?: React.ReactNode
}

/**
 * A mobile navigation component that displays a hamburger menu
 * icon which toggles the display of a vertical list of links.
 *
 * @param {{ links: { name: string; link: string }[], children?: React.ReactNode }} props
 * The props for the component.
 * @returns {JSX.Element} The mobile navigation component.
 * @example
 * <MobileNav
 *   links={[
 *     { name: 'Home', link: '/' },
 *     { name: 'About', link: '/about' },
 *   ]}
 * />
 */
export default function MobileNav({ links, children }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className={style.mobileNav}
        data-nav-open={open}
        onClick={() => setOpen(prev => !prev)}
      />
      {open && (
        <div className={`${style.mobileNavLinks} bg-black-900 backdrop-filter backdrop-blur-sm`}>
          {Object.entries(links).map(([index, link]) => (
            <NavLink
              href={link.link}
              key={index}
              className='font-medium'
              onClick={() => setOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          {children}
        </div>
      )}
    </>
  )
}
