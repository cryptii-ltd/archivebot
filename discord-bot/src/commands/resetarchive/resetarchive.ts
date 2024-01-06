import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../structures/Command";
import { endpointQuery } from "../../functions/genericFunctions"
import { ResetArchiveBody, PassphraseResponse } from "../../typings/Request"
import { ExtendedInteraction } from "../../typings/Command";


/** 
 * exports resetarchive command
 * 
 * @param {string} name - Name of command
 * @param {string} description - description of the command
 * @param {Array<object>} options - list of command options from Discord.js. Takes archivename string and messagelimit Integer.
*/
export default new Command({
    name: 'resetarchive',
    description: 'Reset Archive Passpharse',
    options: [{
        name: 'archivename',
        type: ApplicationCommandOptionType.String,
        description: 'Archive name you are trying reset the passphrase of',
        required: true
    }],
    /**
     * @param {ExtendedInteraction} interaction Discord.js object
     * @returns {string} Discord.js followUp message
    */
    run : async({ interaction }) => {
        // build reset archive body
        const body: ResetArchiveBody = await {
            archive_name: interaction.options.get('archivename', true).value.toString(),
            user_id: interaction.user.id.toString()
        }
        // send resetarchive API request
        const new_passphrase: PassphraseResponse = await endpointQuery('archives', 'POST', '', body)
        if (new_passphrase.ERROR) {
            await interaction.followUp(`There was a problem retrieving your new archive password.`)
        } else {
            // send resetarchive password to user
            await interaction.user.send(`Here is a link to your reset archive - https://view.archive-bot.net/?passphrase=${new_passphrase.passphrase}`)
            await interaction.followUp(`${interaction.user.username} has been sent the new password.`)
        }
    }
})