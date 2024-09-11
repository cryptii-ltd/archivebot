'use client'

import Link from 'next/link'

/**
 * A link component that renders a styled anchor tag with a link to the specified href.
 *
 * @param {{ href: string, children: React.ReactNode, className?: string, target?: string, onClick?: () => void }} props
 * The props for the component.
 * @returns {JSX.Element} The link element.
 * @example
 * <NavLink href="/about">About</NavLink>
 */
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
      className={`${className} text-textSecondary capitalize transition ease hover:text-text`}
      target={target}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
