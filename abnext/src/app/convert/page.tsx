import { createArchive } from '@/lib/archive'
import data from './archive.json'
import { Archive } from '../types/archive'

export default async function Convert() {
  const archive: Archive = data as Archive
  await createArchive(archive.messages, '173785604692246528', data.guild_id, data.archive_name)
}
