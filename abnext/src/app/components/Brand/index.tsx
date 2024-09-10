import style from './style.module.css'
import NavLink from '@/app/components/Nav/NavLink'

import { GrRobot } from 'react-icons/gr'

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
