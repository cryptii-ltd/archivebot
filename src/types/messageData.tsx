interface MessageResponse {
  archiveName: string
  channelName: string
  guildID: string
  guildName: string
  messages: MessageData[]
  userID: string
}

interface MessageData {
  author: string
  authorID: string
  content: string
  date: number
  id: string
  mentions: string[]
  attachments?: [
    {
      source: string
      type: string
    }
  ]
  avatarHash?: string
  reactions?: [string, number][]
}

export default MessageResponse
