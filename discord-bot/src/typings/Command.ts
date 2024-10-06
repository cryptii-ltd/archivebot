import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from "npm:discord.js";
import { ExtendedClient } from "../structures/Client.ts";

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

interface RunOptions {
  client: ExtendedClient,
  interaction: ExtendedInteraction,
  args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  userPermissions?: PermissionResolvable[];
  run: RunFunction;
} & ChatInputApplicationCommandData;