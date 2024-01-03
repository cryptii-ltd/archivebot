import './sidebar.css'
import { IconAdjustmentsAlt, IconChevronRight, IconChevronLeft } from '@tabler/icons-react'

import Logo from '../logo/logo'
import Channels from '../channels/channels'
import FilterOverlay from '../filters/filters'

import { useState } from 'react'
import { Link } from 'react-router-dom'

interface SidebarProps {
  channelName: string
}

export default function Sidebar(props: SidebarProps) {
  const [filterVisible, setFilterVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className='sidebar' data-collapsed={collapsed}>
      {!collapsed ? (
        <>
          <Logo />
          <div className='search'>
            <input type='text' placeholder='Search messages' />
            <IconAdjustmentsAlt onClick={() => setFilterVisible(!filterVisible)} data-toggled={filterVisible} />
          </div>

          {filterVisible && <FilterOverlay />}

          <Channels channels={[{ name: props.channelName, isActive: true }]} />

          <Link to='/'>
            <button type='button'>Leave</button>
          </Link>
        </>
      ) : (
        <Logo isCollapsed={true} />
      )}

      <div className='collapse' onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
      </div>
    </div>
  )
}
