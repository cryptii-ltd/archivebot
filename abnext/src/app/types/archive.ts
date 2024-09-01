export type Archive = {
    archive_name: string,
    channel_name: string,
    guild_id: string,
    guild_name: string,
    user_id: string,
    messages: Message[]
}

export type Message = {
    attachments: any[],
    mentions: any[],
    reactions: any[],
    author: string,
    author_id: string,
    avatar_hash: string,
    content?: string,
    date: number,
    id: string
}
