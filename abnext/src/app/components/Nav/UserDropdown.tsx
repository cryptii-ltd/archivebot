'use client'

import { useState } from 'react'
import Image from 'next/image'
import { User } from '@/app/types/user'
import NavLink from './NavLink'

import { LuMessagesSquare } from 'react-icons/lu'
import { HiLogout } from 'react-icons/hi'
import { RiArrowDropDownLine } from 'react-icons/ri'

interface UserDropdownProps {
  user: User
  mobile?: boolean
}

export default function UserDropdown({ user, mobile }: UserDropdownProps) {
  const [open, setOpen] = useState(false)

  const handleDropDownLeave = () => {
    setOpen(false)
  }

  return (
    <>
      {mobile ? (
        <div className='flex gap-1 items-center justify-center cursor-pointer'>
          <span>{user.username}</span>
          <RiArrowDropDownLine size={24} />
        </div>
      ) : (
        <div className='grid justify-items-end'>
          <Image
            width={48}
            height={48}
            className='w-12 h-12 rounded-full cursor-pointer'
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
            onClick={() => setOpen(prev => !prev)}
            alt='User avatar'
          />

          {open && <DropdownMenu onMouseLeave={handleDropDownLeave} />}
        </div>
      )}
    </>
  )
}

function DropdownMenu({ onMouseLeave }: { onMouseLeave: () => void }) {
  return (
    <div
      className='grid items-start justify-start gap-1 p-2 absolute w-max top-[76px] rounded-xl bg-black-800 border border-black-600'
      onMouseLeave={onMouseLeave}
    >
      <DropDownItem href='/archives'>
        <LuMessagesSquare size={24} />
        My Archives
      </DropDownItem>

      <DropDownItem
        href='/logout'
        external
      >
        <HiLogout size={24} />
        Sign Out
      </DropDownItem>
    </div>
  )
}

function DropDownItem({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <>
      {external ? (
        <a
          href={href}
          className='rounded-lg text-textSecondary capitalize transition ease hover:text-text flex items-center justify-start gap-4 p-2 font-semibold hover:bg-black-600'
        >
          {children}
        </a>
      ) : (
        <NavLink
          href={href}
          className='flex items-center justify-start gap-4 p-2 rounded-lg font-semibold hover:bg-black-600'
        >
          {children}
        </NavLink>
      )}
    </>
  )
}
