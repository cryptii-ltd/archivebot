import { ApplicationCommandDataResolvable, Client, ClientEvents, ClientPresence, Collection, GatewayIntentBits } from "npm:discord.js";
import { CommandType } from "../typings/Command.ts";
import { RegisterCommandOptions } from "../typings/client.ts";
import { expandGlob } from "@std/fs/expand-glob"
import { getDirname } from "../functions/utilt.ts";
import { Event } from "./Event.ts";
export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();

  constructor() {
    super({intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping
    ]})
  }

  start() {
    this.registerModules()
    this.login(Deno.env.get("botToken"))
  }

  async importFile(filePath:string) {
    return (await import(filePath))?.default
  }

  registerCommands({commands, guildId}: RegisterCommandOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registering Guild Commands: ${guildId}`)
    } else {
      this.application?.commands.set(commands);
      console.log(`Registering Global Commands.`)
    }
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const __dirname = getDirname()
    const commandFiles = await Array.fromAsync(expandGlob(`${__dirname}/../commands/*/*{.ts}`))
    commandFiles.forEach(async commandFile => {
      const command: CommandType = await this.importFile(commandFile.path)
      console.log({ command })
      if (!command.name) return;
      this.commands.set(command.name, command)
      slashCommands.push(command);
    })

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: Deno.env.get("guildId")
      })
    })

    const eventFiles = await Array.fromAsync(expandGlob(`${__dirname}/../events/*{.ts}`))
    eventFiles.forEach(async eventFile => {
      const event: Event<keyof ClientEvents> = await this.importFile(eventFile.path)
      this.on(event.event, event.run)
      console.log(event)
    })
  }
}