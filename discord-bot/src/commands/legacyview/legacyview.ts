import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType } from "discord.js";
import fs from "fs"
import readline from "readline";
import { ExtendedInteraction } from "../../typings/Command";

/** 
 * exports legacyview command
 * 
 * @param {string} name - Name of command
 * @param {string} description - description of the command
 * @param {Array<object>} options - list of command options from Discord.js. Takes archivename string and messagelimit Integer.
 * 
*/
export default new Command({
    name: "legacyview",
    description: "Retrieve legacy archives from old Python Discord Archive Bot.",
    options: [
        {
            name: 'archivename',
            type: ApplicationCommandOptionType.String,
            description: 'Name of archive to retrieve from legacy bot. (DO NOT INCLUDE .HTML)',
            required: true
        },
        {
            name: 'servername',
            type: ApplicationCommandOptionType.String,
            description: 'Name of the server where your legacy archive exists (THIS NEEDS TO BE EXACT).',
            required: false
        }
    ],
    /**
     * @param {ExtendedInteraction} interaction - Discord.js object
     * @returns {string} Discord.js followUp message
    */
    run : async ({ interaction }) => {
        // get archive name from command
        var archiveName = await interaction.options.get('archivename', true).value;
        var guildname = '';
        try {
            var guildname = await interaction.guild.name
        }
        catch (e) {
            // if the user has change their severname they can pass it in as an optional command
            if (interaction.options.get('servername', false)) {
                var guildname = interaction.options.get('servername', false).value.toString();
            } else {
                interaction.followUp(`You need to specify a server if view the archive from Direct Messages.`)
                return
            }
            await interaction.user.send(`You are trying to access a legacy archive by DMing the bot 
            - make sure your servername is correct: ${guildname} or access the archive by using this command
             in the server`)
        }
        // format guildname
        if (!guildname) await interaction.followUp(`Guild nickname not found`)
        guildname = guildname.replace(/\s+/g, '')
        guildname = guildname.replace("/", "")
        // build filepath structure
        const archive_path = `${process.env.legacyfolder}${guildname}/${archiveName}.html`
        // check legacy archive exists
        if (await fs.existsSync(archive_path)) {
            const file_stream = await fs.createReadStream(archive_path, 'utf-8')
            const rl = readline.createInterface({
                input: file_stream,
                crlfDelay: Infinity
            })
            var auth_line
            // get first line
            for await (const line of rl) {
                auth_line = line;
                break
            }
            // get authenticated users
            const auth_str = auth_line.split('</p>')[0].split('<p hidden>')[1].split(':')
            const auth_list = []
            auth_str.forEach(auth => {
                if (auth !== '') {
                    auth_list.push(auth)
                }
            })
            // check if user is in authenticated users
            if (auth_list.includes(interaction.user.id.toString())){
                // send html directly to user file
                await interaction.user.send({
                    files: [
                        {
                            attachment: archive_path,
                            name: `${archiveName}.html`
                        }
                    ],
                    content: "Here is your legacy file!"
                })
                await interaction.followUp(`The legacy archive has been sent to ${interaction.user.username}.`)
            } else {
                await interaction.followUp(`You are not authorised to view this legacy file. If you think this incorrect contact the Archive Bot Community Server.`)
            }
        } else {
            await interaction.followUp(`Archive ${archiveName} not found.`)
        }
    }
})