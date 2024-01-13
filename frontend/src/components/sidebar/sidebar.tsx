import './sidebar.css'
import { IconAdjustmentsAlt, IconChevronRight, IconChevronLeft, IconLogout } from '@tabler/icons-react'

import Logo from '../logo/logo'
import Channels from '../channels/channels'
import FilterOverlay from '../filters/filters'

import { SearchFilters } from '../../types/searchFilters'

import { useState } from 'react'
import { Link } from 'react-router-dom'

interface SidebarProps {
  guildName: string
  channelName: string
  searchFilter: SearchFilters
}

/**
 * Sidebar Component - Handles rendering Logo, Search, Channels, and Leave Button
 * @param {SidebarProps} props - The properties for the Sidebar component.
 * @returns {JSX.Element} Sidebar component.
 */
export default function Sidebar(props: SidebarProps) {
  const [filterVisible, setFilterVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className='sidebar' data-collapsed={collapsed}>
      {!collapsed ? (
        <>
          <Logo />
          <div className='search'>
            <input type='text' placeholder='Search messages' onChange={(e) => props.searchFilter.setContentQUery(e.target.value)} value={props.searchFilter.contentQuery} />
            <div>
              <IconAdjustmentsAlt onClick={() => setFilterVisible(!filterVisible)} data-toggled={filterVisible} />
            </div>

            {filterVisible && <FilterOverlay searchAuthor={props.searchFilter.authorQuery} setSearchAuthor={props.searchFilter.setAuthorQuery} />}
          </div>

          <div className='guild-name'>
            <h3>{props.guildName}</h3>
          </div>
          <Channels channels={[{ name: props.channelName, isActive: true }]} />

          <Link to='/'>
            <button type='button'>Leave</button>
          </Link>
        </>
      ) : (
        <>
          <Logo isCollapsed={true} />

          <Link to='/'>
            <IconLogout />
          </Link>
        </>
      )}

      <div className='collapse' onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
      </div>
    </div>
  )
}
