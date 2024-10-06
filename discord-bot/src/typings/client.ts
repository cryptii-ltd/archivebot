import { ApplicationCommandDataResolvable } from "npm:discord.js";

export interface RegisterCommandOptions {
  guildId?: string;
  commands: ApplicationCommandDataResolvable[];
}