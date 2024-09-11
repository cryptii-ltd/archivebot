import style from './style.module.css'
import NavLink from '@/app/components/Nav/NavLink'

import { GrRobot } from 'react-icons/gr'

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
      <GrRobot
        className='text-sectionDarkText'
        size={25}
      />
      <span className={`${style.brand} text-sectionDarkText`}>ArchiveBot</span>
    </NavLink>
  )
}
