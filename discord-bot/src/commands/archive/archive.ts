import { Command } from "../../structures/Command";
import { RoleStatus, User } from "../../typings/User";
import fetch from "node-fetch";
import { MessageFetchOptions, NormaliseMessage, BuildMessagePost } from "../../typings/Message";
import { PassphraseResponse, ListArchivesResponse } from "../../typings/Request";
import { check_user_role, endpointQuery } from "../../functions/genericFunctions";
import { ApplicationCommandOptionType } from "discord.js";
import { ExtendedInteraction } from "../../typings/Command";

/** 
 * exports archive command
 * 
 * @param {string} name - Name of command
 * @param {string} description - description of the command
 * @param {Array<object>} options - list of command options from Discord.js. Takes archivename string and messagelimit Integer.
 * 
*/
export default new Command({
    name: 'archive',
    description: 'creates a new archive',
    options: [
        {
            name: 'archivename',
            type: ApplicationCommandOptionType.String,
            description: 'Sets Archive Name',
            required: true
        },
        {
            name: 'messagelimit',
            type: ApplicationCommandOptionType.Integer,
            description: 'Change the message archive limit SUPPORTER ONLY',
            required: false
        }
    ],
    /**
     * @param {ExtendedInteraction} interaction - Discord.js object
     * @returns {string} Discord.js followUp message
    */
    run: async ({ interaction }) => {
        // get archive name from user input
        const archiveName = interaction.options.get('archivename', true);
        // get message limit from user input (optional)
        const inputted_message_limit = interaction.options.get('messagelimit', false)
        // create empty array where Discord.js message objects will be stored
        const archivedMessages: any[] = []
        // store Discord channel object
        const interactionChannel = interaction.channel;

        // if bot is unable to see channel throw error
        if (!interactionChannel) {
            return interaction.followUp(`Unable to locate channel. Contact bot owner`)
        }

        // create empty variable for lastId
        let lastId;
        // check users role on archive bot community server
        const role_status: RoleStatus = await check_user_role(interaction, interaction.user.id)
        // create user object based off of obtained role
        const user_info = new User(role_status)

        // assign default message limit
        let message_limit = 20000;

        /** 
         * if user has specified increased message limit in command and they are approved to change
         * then assign the message_limit to their inputted amount
        */
        if (inputted_message_limit && user_info.user_info.can_change) {
            if (Number(inputted_message_limit.value) > user_info.user_info.message_limit) {
                interaction.followUp(`You are unable to increase your archive message limit beyond ${user_info.user_info.message_limit}. You defined it as ${inputted_message_limit.value}. If you would like to increase your limit visit https://www.patreon.com/DiscordArchiveBot`)
                return
            }
            message_limit = Number(inputted_message_limit.value)
        } else if (inputted_message_limit && !user_info.user_info.can_change) {
            interaction.followUp(`You are not a supporter+ and cannot change your message limit. You are capped to archiving 20,000 Messages per archive. If you would like to increase your limit visit https://www.patreon.com/DiscordArchiveBot`)
            return
        }

        // if they have not specified a message limit then assign it to their roles default
        if (!inputted_message_limit) {
            message_limit = user_info.user_info.message_limit
        }

        // query list archives endpoint for user_id and guild_id
        const list_response = await fetch(`http://${process.env.remoteEndpoint}/v1/archives/guild/${interaction.guild.id.toString()}/${interaction.user.id.toString()}`, {
            method: 'GET',
        })

        let current_archive_num: number
        if (!list_response.ERROR) {
            const json_resp: ListArchivesResponse = await list_response.json()
            current_archive_num = Number(json_resp.archives)
        } else {
            interaction.followUp('Error with endpoint please try again later...')
            return
        }

        // if they have hit their archive limit then error and return
        if (Number(current_archive_num) >= user_info.user_info.archive_limit) {
            interaction.followUp(`You have run out of archives for this server. You currently have ${current_archive_num} archives and are limited to ${user_info.user_info.archive_limit}. Please delete an archive or consider supporting via https://www.patreon.com/DiscordArchiveBot.`)
            return
        }

        // if user wants to archive less than 100 messages set fetch_option = to message_limit passed in
        let fetch_option = 100
        if (message_limit < 100) {
            fetch_option = message_limit
        }

        // generate messages.fetch options based off of fetch limit
        const options: MessageFetchOptions = { limit: fetch_option }
        var count = 0
        await interaction.followUp(`Archiving Server.`).then(async msg => {
            // while true fetch all messages upto users message limit
            while (true) {
                // if lastId is assigned then archive messages before this message_id
                if (lastId) {
                    options.before = lastId
                }
                // fetch messages from Discord API
                const messages = await interactionChannel.messages.fetch(options);
                lastId = messages.last()?.id
                // for each message retrieved add it to archived messages array
                messages.forEach(message => {
                    archivedMessages.push(message);
                    count += 1
                })
                // break
                if (messages.size != 100 || archivedMessages.length >= message_limit) {
                    break
                }
                // update message with the amount of messages archived
                msg.edit(`Archived ${count} out of a possible ${message_limit} messages.`)
            }
            // update with encrypting message once complete
            msg.edit(`Archiving Completed. Encrypting and storing. This could take a while....`)
        })

        // build post JSON structure for API request using BuildMessagePost Class
        const message_post = new BuildMessagePost(interaction.channel.name.toString(), interaction.user.id.toString(), archiveName.value.toString(), interaction.guild.id.toString(), interaction.guild.name.toString());

        // initialise empty array
        message_post.message_post.messages = []

        // for each Discord.js message object archived
        archivedMessages.forEach(message => {
            // normalise message
            const msg = new NormaliseMessage(message);
            // add to message_post.messages object
            message_post.message_post.messages.push(msg.messageObj)
        })

        // reverse messages so newest shows first
        message_post.message_post.messages = message_post.message_post.messages.reverse()

        // post built JSON object to endpoint and export passphrase
        const response: PassphraseResponse = await endpointQuery('messages', 'POST', null, message_post.message_post)

        // handle endpoint errors
        if (response.ERROR) {
            interaction.followUp(`${response.body} Please try again later.`)
            return;
        }

        // direct message user with passphrase
        await interaction.user.send(`https://view.archive-bot.net/?passphrase=${response.passphrase}`)

        // message chat with final archived messages count
        interaction.followUp(`Archived ${archivedMessages.length.toLocaleString()} messages. We have DM'd the view link to ${interaction.user.username.toString()}`)
    }
})