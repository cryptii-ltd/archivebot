export interface MessageResponse {
  archive_name: string
  channel_name: string
  guild_id: string
  guild_name: string
  messages: MessageData[]
  user_id: string
}

export interface MessageData {
  author: string
  author_id: string
  content: string
  date: number
  id: string
  mentions: string[]
  attachments: [
    {
      name: string
      source: string
      type: string
    }
  ]
  avatar_hash: string
  reactions: [string, number][]
}