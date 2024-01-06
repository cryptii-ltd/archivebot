import { Command } from "../../structures/Command";
import { ListArchivesResponse } from "../../typings/Request"
import { endpointQuery, listIndexArchives } from "../../functions/genericFunctions"
import { ExtendedInteraction } from "../../typings/Command";


/** 
 * exports listarchives command
 * 
 * @param {string} name - Name of command
 * @param {string} description - description of the command
 * @param {Array<object>} options - list of command options from Discord.js. Takes archivename string and messagelimit Integer.
 * 
*/
export default new Command({
    name: 'listarchives',
    description: 'View archives for your guild.',
    /**
     * @param {ExtendedInteraction} interaction Discord.js object
     * @returns {string} Discord.js followUp message
    */
    run : async({ interaction }) => {
        // query API for list of users archive
        const response: ListArchivesResponse = await endpointQuery('archives', 'GET', interaction.user.id.toString())
        if (response.archives) {
            // check user has archives
            if (response.archives.length > 0) {
                // build listarchive message and send to user
                const messages = await listIndexArchives(response.archives)
                messages.forEach(async msg => {
                    await interaction.user.send(await msg)
                })
                interaction.followUp(`${interaction.user.username.toString()} was sent a list of their available archives!`)
            } else {
                interaction.followUp(`There were no archives found for ${interaction.user.username.toString()}.`)
            }
        } else {
            interaction.followUp(`There is an error with Arcbots backend services. Please try again later.`)
        }
        if (response.ERROR){
            interaction.followUp(`There has been an error while retrieving a list of your archives. Please try again later.`)
            return;
        }
        interaction.followUp(`${interaction.user.username.toString()} was sent a list of their available archives!`)
    }
})