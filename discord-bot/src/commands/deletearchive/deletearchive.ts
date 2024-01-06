import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../structures/Command";
import { endpointQuery } from "../../functions/genericFunctions"
import { DeleteResponse } from "../../typings/Request"
import { ExtendedInteraction } from "../../typings/Command";

/** 
 * exports deletearchive command
 * 
 * @param {string} name - Name of command
 * @param {string} description - description of the command
 * @param {Array<object>} options - list of command options from Discord.js. Takes archivename string and messagelimit Integer.
 * 
*/
export default new Command({
    name: 'removearchive',
    description: 'Delete archive from server',
    options: [
        {
            name: 'passphrase',
            type: ApplicationCommandOptionType.String,
            description: 'Passphrase to the archive you want to delete.',
            required: true
        }
    ],
    /**
     * @param {ExtendedInteraction} interaction Discord.js object
     * @returns {string} Discord.js followUp message
    */
    run : async ( { interaction } ) => {
        // get passphrase from user input
        const passphrase = interaction.options.get('passphrase', true).value.toString();
        // get user_id from Discord.js interaction
        const user_id = interaction.user.id.toString();
        // query endpoint to ensure they are authorised to delete the archive
        const response: DeleteResponse = await endpointQuery('archives/auth', "POST", null, {'user_id': user_id, 'passphrase': passphrase})
        if (response.ERROR) {
            interaction.followUp(`You are not authorised to delete this archive.`)
            return
        }
        // delete archive using passphrase
        const delete_response: DeleteResponse = await endpointQuery(`messages/${passphrase}`, 'DELETE')
        if (delete_response.ERROR) {
            interaction.followUp(`Error deleting archive`)
            return
        }
        // send final response
        interaction.followUp(`Archive Deleted.`)
    }
})