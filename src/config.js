import * as Discord from "discord.js";
import * as dotenv from "dotenv";
import * as commands from "./commands/index.js"
dotenv.config()

export const TOKEN = process.env.TOKEN;
export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DISCORD_CLIENT = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildMembers
	],
});
export const APPLICATION_COMMANDS = {};
export const DB_INITS = [];

Object.keys(commands).forEach(key => {
	const cmd = commands[key];

	if ('type' in cmd) {
		if ('data' in cmd && 'exec' in cmd) {
			// Can be treated as a command
			if (cmd.type == "APP_CMD")
				APPLICATION_COMMANDS[cmd.data.name] = cmd;
		} else if (cmd.type == 'DB_INIT') {
			// Database file, require an init function
			if ('init' in cmd) {
				DB_INITS.push(cmd);
			}
		}		
	}
});