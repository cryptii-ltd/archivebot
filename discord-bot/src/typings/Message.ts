/**
 * MessageFetchType
 * 
 * used to type the options passed in for 
 * message fetch for Discord.js
*/
export interface MessageFetchOptions {
    limit: number,
    before?: string
}

/**
 * attachment
 * 
 * Used in MessageReturns type to generate and store
 * message attachments source and type
*/
export interface attachment {
    source?: string;
    type?: string;
}

/**
 * MessagePost
 * 
 * Typing for the POST JSON sent to the API
*/
export interface MessagesPost {
    user_id: string;
    channel_name: string;
    guild_name: string;
    archive_name: string;
    guild_id: string;
    messages: any[]
}

export class BuildMessagePost {
    message_post: MessagesPost;

    /**
     * Returns contructed message_post object
     * 
     * @remarks
     * This methods takes required inputs to build
     * message_post JSON
     * 
     * @param {string} channel_name - channel name of archive
     * @param {string} user_id - user_id of user archiving channel
     * @param {string} archive_name - archive name passed in by user
     * @param {string} guild_id - guild_id of guild being archived
     * @param {string} guild_name - guild name of guild being archied
     */
    constructor(channel_name: string, user_id: string, archive_name: string, guild_id: string, guild_name:string) {
        this.message_post = {
            user_id: user_id,
            channel_name: channel_name,
            archive_name: archive_name,
            guild_id: guild_id,
            guild_name: guild_name,
            messages: []
        }
    }
}

/** 
 * MessageReturns
 * 
 * @remarks
 * Used by NormaliseMessage class to build a Cryptii 
 * Message Object
*/

export interface MessageReturns {
    id: string;
    date: number;
    author: string;
    avatar_hash: string;
    author_id: string;
    content?: string;
    reactions?: Array<[Array<[string, number]>]>;
    mentions?: Array<[string]>;
    replyto?: string;
    attachments ?: Array<[attachment?]>
}


/**
 * MessageObject
 * 
 * @remarks
 * Used by archive command to export only the useful stuff from
 * Discord.js message object
*/
export interface MessageObject {
    id: string;
    author: any;
    member: any;
    guild: any;
    content: string;
    createdTimestamp: number;
    date: number | Date;
    reactions?: any;
    attachments?: any;
    mentions?: any;
}

export class NormaliseMessage {
    messageObj: MessageReturns;
    /**
     * Checks message content for bad words and replaces them#
     * 
     * @param {MessageObject} message - stripped down Discord.js message object
     * @returns {MessageReturns} [Formatted message with "Bad words" removed
     */
    badWordCheck(message: MessageObject) {
        const badW = ['bmlnZ2Vy', 'ZmFnZ290', 'ZmFn', 'bmlnZ2E=', 'YmFkd29yZA==']
        const decode = (str: string):string => Buffer.from(str, 'base64').toString('binary');
        badW.forEach(bad => {
            if (message.content.includes(decode(bad))) {
                message.content = message.content.replace(decode(bad), 'CENSOR')
            }
        });
        return message
    }


    /**
     * Formats youtube URLs present in messageContent string to be handled in UI
     * 
     * @param {string} messageContent - takes message content string
     * @returns {Array<attachment>} Array of youtube attachments type
     */
    getYoutubeUrls(messageContent) {
        const youtubeURLs = [];
        const youtubeUrl = 'https://www.youtube.com/watch?v';
        messageContent.split(' ').forEach(word => {
            if (word.includes(youtubeUrl)) {
                youtubeURLs.push({"source": word, "type": "youtube"});
            }
        });
        return youtubeURLs
    }

    /**
     * Identifies any attachments in message and formats them for view UI
     *
     * @param {MessageObject} message - stripped down Discord.js message object
     * @returns {Array<attachment>} array attachments extracted from Discord.js message object
     */
    getMessageAttachments(message: MessageObject) {
        const validImageAttachments = ['jpg', 'png', 'jpeg', 'gif', 'tiff', 'bmp', 'webm']
        const validVideoAttachments = ['mp4']
        const attachments = []
        message.attachments.forEach(attachment => {
            if (validImageAttachments.includes(attachment.url.split('.').pop())) {
                let att: attachment = {};
                att.source = attachment.url
                att.type = "image"
                attachments.push(att)
            } else if (validVideoAttachments.includes(attachment.url.split('.').pop())) {
                let att: attachment = {}
                att.source = attachment.url
                att.type = "video"
                attachments.push(att)
            } else {
                let att: attachment = {};
                att.source = attachment.url
                att.type = "attachment"
                attachments.push(att)
            }
        })
        return attachments
    }


    /**
     * Identifies Tenor GIF messages and formats for view UI
     * 
     * @param {MessageObject} message - stripped down Discord.js message object
     * @returns {Array<attachment>} Tenor attachment type
     */
    formatTenorGifs(message: MessageObject) {
        const tenorName = message.content.split('/').at(-1)
        const tenorId = tenorName.split('-').at(-1)
        return {"type": "tenor", "source": message.content, "name": tenorName, "id": tenorId}
    }

    /**
     * Replaces mentions in message content with view UI formatting
     * 
     * @param {MessageObject} message - stripped down Discord.js message object
     * @param {string} userId - user ID of mentioned user
     * @param {string} userName - username of mentioned user
     * @returns {MessageObject} MessageObject with mentioned users ID replaced with username
     */
    mentionIdReplace(message: MessageObject, userId: string, userName: string) {
        const rawMentionString = `<@${userId}>`;
        const newMentionString = `@${userName}`;
        message.content = message.content.replaceAll(rawMentionString, newMentionString);
        return message
    }


    /**
     * Gets reactions from messages and formats for view UI
     * 
     * @param {MessageObject} message - stripped down Discord.js message object
     * @returns {Array<object>} Array of arrays with emoji name and reaction count
     */
    getReactionsFromMessage(message: MessageObject) {
        const reactions = []
        message.reactions.cache.forEach(reaction => {
            const tmp_reaction = []
            tmp_reaction.push(reaction._emoji.name)
            tmp_reaction.push(reaction.count)
            reactions.push(tmp_reaction)
        })
        return reactions
    }

    /**
     * Returns Normalised MessageReturns object
     * 
     * @remarks
     * Used to format message objects into a format recognised
     * by the Cryptii frontent
     * 
     * @param {MessageObject} message - Discord.js message object (stripped)
     */
    constructor(message: MessageObject) {
        if (message.reactions.reactions) {
            console.log(message.reactions.reactions)
        }
        message = this.badWordCheck(message);
        message.date = message.createdTimestamp;
        const attachments  = []
        if (message.attachments.size !== 0) {
            attachments.push(...this.getMessageAttachments(message));
        } else if (message.content.includes('https://www.youtube.com/watch?v')) {
            attachments.push(...this.getYoutubeUrls(message.content));
        }else if (message.content.includes('https://tenor.com')) {
            attachments.push(this.formatTenorGifs(message))
       }

       const mentioned_users: Array<[string]> = [];
       message.mentions.users.forEach(user_mention => {
        mentioned_users.push(user_mention.username)
        message = this.mentionIdReplace(message, user_mention.id, user_mention.username);
       });

       this.messageObj = {
        id: message.id,
        avatar_hash: message.author.avatar,
        author_id: message.author.id,
        author: message.author.username,
        content: message.content,
        attachments : attachments,
        date: message.date,
        mentions: mentioned_users,
        reactions: this.getReactionsFromMessage(message)
       }
    }
}