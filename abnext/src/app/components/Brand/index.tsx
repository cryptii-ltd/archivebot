import style from './style.module.css'
import NavLink from '@/app/components/Nav/NavLink'
import Image from 'next/image'

/**
 * A component that renders a link to the homepage with a brand icon and text.
 *
 * @returns A JSX element representing the brand link.
 */
export default async function Brand() {
  return (
    <NavLink
      href='/'
      className={` ${style.link} flex items-center justify-start gap-2`}
    >
      <Image
        width={18}
        height={18}
        src='/logo.svg'
        alt='Logo'
      />
      <span className={`${style.brand} text-text`}>ArchiveBot</span>
    </NavLink>
  )
}
