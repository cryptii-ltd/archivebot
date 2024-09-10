'use client'

import Link from 'next/link'

export default function NavLink({
  href,
  children,
  className,
  target,
  onClick,
}: {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      className={`${className} text-sectionDarkTextSecondary capitalize transition ease hover:text-sectionDarkText`}
      target={target}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
