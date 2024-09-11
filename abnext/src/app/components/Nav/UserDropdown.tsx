'use client'

import { User } from '@/app/types/user'

interface UserDropdownProps {
  user: User
  mobile?: boolean
}

export default function UserDropdown({ user, mobile }: UserDropdownProps) {
  return (
    <a
      href='/logout'
      className='flex items-center justify-center gap-2 cursor-pointer'
    >
      <>
        {mobile ? (
          <span>{user.username}</span>
        ) : (
          <img
            className='w-12 h-12 rounded-full'
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
          />
        )}
      </>
    </a>
  )
}

