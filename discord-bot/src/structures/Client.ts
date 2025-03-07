import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection, GatewayIntentBits } from "discord.js"
import { CommandType } from "../typings/Command"
import { promisify } from "util"
import { Event } from "./Event"
import glob from 'glob'
import { RegisterCommandOptions } from "../typings/client";
const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping
        ]})
    }

    start() {
        this.registerModules()
        this.login(process.env.botToken)
    }

    async importFile(filePath:string) {
        return (await import(filePath))?.default
    }

    async registerCommands({ commands, guildId }: RegisterCommandOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering Guild Specific Commands: ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log(`Registering Global Commands.`)
        }
    }

    async registerModules() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);
        commandFiles.forEach(async filePath => {
            const command: CommandType = await this.importFile(filePath);
            console.log({ command });
            if (!command.name) return;
            this.commands.set(command.name, command)
            slashCommands.push(command);
        });

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.guildId
            });
        });

        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        );
        eventFiles.forEach(async filePath => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.event, event.run)
            console.log(event)
        })
    }
}
