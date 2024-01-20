export type MessageResponse = {
  archive_name: string
  channel_name: string
  guild_id: string
  guild_name: string
  messages: MessageData[]
  user_id: string
}

export type Attachment = {
  name: string
  source: string
  type: string
}

export type MessageData = {
  author: string
  author_id: string
  content: string
  date: number
  id: string
  mentions: string[]
  attachments: Array<Attachment>
  avatar_hash: string
  reactions: [string, number][]
}