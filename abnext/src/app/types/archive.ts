export type Archive = {
    archive_name: string,
    channel_name: string,
    guild_id: string,
    guild_name: string,
    user_id: string,
    messages: Message[]
}

export type Message = {
    archive_id: number,
    message_id: string,
    author: string,
    author_id: string,
    avatar_hash: string,
    content: {
        attachments: string[],
        content: string,
        mentions: string[],
        reactions: [string, number][]
    },
    created_at: number,
}
