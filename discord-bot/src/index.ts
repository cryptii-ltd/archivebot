require("dotenv").config();
import { ShardingManager } from "discord.js";

const manager = new ShardingManager('src/bot.ts', { token: process.env.botToken, execArgv: ['-r', 'ts-node/register'] });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();