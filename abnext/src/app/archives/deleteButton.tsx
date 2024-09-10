'use client'

import { deleteArchive } from '@/_lib/archive'
import Button from '@/app/components/Button'

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
export default function DeleteButton({ archiveId }: DeleteButtonProps) {
  const handleClick = async () => {
    await deleteArchive(archiveId)
  }

  return (
    <Button
      type='secondary'
      onClick={handleClick}
    >
      Delete Archive
    </Button>
  )
}
