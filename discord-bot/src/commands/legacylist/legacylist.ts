import { Command } from "../../structures/Command";
import { listIndexArchives } from "../../functions/genericFunctions"
import { ExtendedInteraction } from "../../typings/Command";


const fs = require('fs')

/** 
 * exports legacylist command
 * 
 * @param {string} name - Name of command
 * @param {string} description - description of the command
 * @param {Array<object>} options - list of command options from Discord.js. Takes archivename string and messagelimit Integer.
 * 
*/
export default new Command({
    name: "legacylist",
    description: "List legacy archives.",
    /**
     * @param {ExtendedInteraction} interaction Discord.js object
     * @returns {string} Discord.js followUp message
    */
    run : async ({ interaction }) => {
        // ensure interaction is taking place in guild
        if (!interaction.guild) {
            await interaction.followUp(`You need to run this command in the server you want 
            to list the legacy archives of.`)
            return
        }
        // obtain and format guild name
        var guildname = await interaction.guild.name
        guildname = guildname.replace(/\s+/g, '')
        guildname = guildname.replace("/", "")
        // format directory
        const folderName = `${process.env.legacyfolder}${guildname}`
        const file_names = []
        // read legacy directory and push file name to array
        try {
            await fs.readdirSync(folderName).forEach(file => {
                file_names.push(file)
            })
        } catch {
            interaction.followUp('Error retrieving legacy archives. Please contact the developers via the discord archive bot community server.')
            return
        }
        if (file_names.length > 0) {
            // build list of messages based off of file names
            const messages = await listIndexArchives(file_names);
            // send messages to user
            await messages.forEach(async msg => {
                await interaction.user.send(await msg)
            })
            await interaction.followUp(`${interaction.user.username.toString()} was sent a list of their available archives!`)
        } else {
            await interaction.followUp(`There were no archives found for ${interaction.guild.name.toString()}.`)
        }
    }
})