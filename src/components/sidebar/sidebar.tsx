import { useState } from 'react'

import './sidebar.css'
import { IconAdjustmentsAlt, IconChevronRight, IconChevronLeft } from '@tabler/icons-react'
import Logo from '../logo/logo'
import Channels from '../channels/channels'
import FilterOverlay from '../filterOverlay/filterOverlay'

export default function Sidebar() {
  const [filterVisible, setFilterVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className='sidebar' data-collapsed={collapsed}>
      {!collapsed ? (
        <>
          <Logo />
          <div className='search'>
            <input type='text' placeholder='Search messages' />
            <IconAdjustmentsAlt onClick={() => setFilterVisible(!filterVisible)} />
          </div>

          {filterVisible && <FilterOverlay />}

          <Channels channels={[{ name: 'general', isActive: true }, { name: 'dev-chat' }, { name: 'images' }, { name: 'mod-chat' }]} />

          <button>Leave</button>
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
