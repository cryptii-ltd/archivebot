import { Event } from "../structures/Event"
import { client } from "../bot"
import { CommandInteractionOptionResolver } from "discord.js";
import { ExtendedInteraction } from "../typings/Command";

export default new Event('interactionCreate', async (interaction) => {
    if(interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if(!command) {
            return interaction.followUp(`This is not a command.`)
        }
        try {
            await command.run({
                args: interaction.options as CommandInteractionOptionResolver,
                client,
                interaction: interaction as ExtendedInteraction
            })
        } catch (e) {
            console.log(e)
        }
    }
});