import style from './index.module.css'
import { IconAdjustmentsAlt, IconChevronRight, IconChevronLeft, IconLogout } from '@tabler/icons-react'

import Logo from '../Logo'
import Channels from '../Channels'
import FilterOverlay from '../Filters'

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
export default function Sidebar(props: SidebarProps): JSX.Element {
  const [filterVisible, setFilterVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={style.sidebar}
      data-collapsed={collapsed}
    >
      {!collapsed ? (
        <>
          <Logo />
          <div className={style.search}>
            <input
              type='text'
              placeholder='Search messages'
              onChange={(e) => props.searchFilter.setContentQuery(e.target.value)}
              value={props.searchFilter.contentQuery}
            />
            <div>
              <IconAdjustmentsAlt
                onClick={() => setFilterVisible(!filterVisible)}
                data-toggled={filterVisible}
              />
            </div>

            {filterVisible && (
              <FilterOverlay
                searchAuthor={props.searchFilter.authorQuery}
                linkToggle={props.searchFilter.toggleLinks}
                imageToggle={props.searchFilter.toggleImages}
                videoToggle={props.searchFilter.toggleVideos}
                setLinkToggle={props.searchFilter.setToggleLinks}
                setImageToggle={props.searchFilter.setToggleImages}
                setVideoToggle={props.searchFilter.setToggleVideos}
                setSearchAuthor={props.searchFilter.setAuthorQuery}
              />
            )}
          </div>

          <div className={style.guildName}>
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

      <div
        className={style.collapse}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
      </div>
    </div>
  )
}
