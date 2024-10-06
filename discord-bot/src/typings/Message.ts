import * as base64 from "jsr/@std/encoding/base64"

/**
 * MessageFetchType
 * 
 * used to type the options passed in for
 * message fetch for Discord.js
*/
export interface MessageFetchOptions {
  limit: number;
  before?: string;
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
 * Type for the POST JSOn sent to the API for archive storage
*/
export interface MessagePost {
  user_id: string;
  channel_name: string;
  guild_name: string;
  archive_name: string;
  guild_id: string;
  messages: any[]
}

export class BuildMessagePost {
  message_post: MessagePost;

  /**
   * Returns constructed message_post object
   * 
   * @remarks
   * This method takes required inputs to build
   * message_post JSON
   * 
   * @param {string} channel_name - channel name of archive
   * @param {string} user_id - user_id of user archiving channel
   * @param {string} archive_name - archive name passed in by user
   * @param {string} guild_id - guild_id of guild being archived
   * @param {string} guild_name - guild name of guild being archived
  */
  constructor(channel_name: string, user_id: string, archive_name: string, guild_id: string, guild_name: string) {
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
  attachments?: Array<[attachment?]>;
}

/**
 * MessageObject
 * 
 * @remarks
 * used by archive command to export only the useful stuff from
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
   * Checks message content for bad words and replaces them.
   * 
   * @param {MessageObject} message - stripped down Discord.js message object
   * @returns {MessageReturns} - Formatted Message with "Bad Words" removed. 
  */
  badWordCheck(message: MessageObject) {
    const badW = ['bmlnZ2Vy', 'ZmFnZ290', 'ZmFn', 'bmlnZ2E=', 'YmFkd29yZA==']
    const textDecoder = new TextDecoder();
    badW.forEach((bad: string) => {
      if (message.content.includes(textDecoder.decode(base64.decode(bad)))) 
        message.content = message.content.replace(textDecoder.decode(base64.decode(bad)), 'CENSOR')
    })
    return message
  }
}