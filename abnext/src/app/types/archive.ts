export type Archive = {
    archive_name: string,
    channel_name: string,
    guild_id: string,
    guild_name: string,
    messages: Message[]
}

export type Message = {
    attachments: Attachment[],
    author: string,
    author_id: string,
    avatar_hash: string,
    content: string,
    date: number,
    id: string,
    mentions: string[] | null,
    reactions: string[] | null
}

export type Attachment = {
    source: string,
    type: string
}