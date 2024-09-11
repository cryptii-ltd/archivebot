'use client'

import { deleteArchive } from '@/_lib/archive'

import { LuFileMinus2 } from 'react-icons/lu'

interface DeleteButtonProps {
  archiveId: number
}

/**
 * Renders a button to delete an archive.
 *
 * @param {{ archiveId: number }} props Properties
 * @param {number} props.archiveId The id of the archive to delete
 *
 * @returns {JSX.Element} The rendered button
 */
export default function DeleteArchive({ archiveId }: DeleteButtonProps) {
  const handleClick = async () => {
    await deleteArchive(archiveId)
  }

  return (
    <LuFileMinus2
      size={24}
      className='cursor-pointer'
      onClick={handleClick}
    />
  )
}
