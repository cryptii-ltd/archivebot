import "jsr:@std/dotenv/load"
import { ShardingManager } from "npm:discord.js"

const manager  = new ShardingManager("src/bot.ts", {token: Deno.env.get("botToken")})
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`))

manager.spawn()