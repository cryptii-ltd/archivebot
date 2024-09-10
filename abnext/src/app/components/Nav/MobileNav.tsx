'use client'

import style from './style.module.css'

import { useState } from 'react'
import NavLink from '@/app/components/Nav/NavLink'

interface MobileNavProps {
  links: { name: string; link: string }[]
  children?: React.ReactNode
}

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
        <div className={`${style.mobileNavLinks} bg-sectionDark backdrop-filter backdrop-blur-sm`}>
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
