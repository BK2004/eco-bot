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

Object.keys(commands).forEach(key => {
	const cmd = commands[key];

	if ('data' in cmd && 'type' in cmd) {
		if (cmd.type == "APP_CMD")
			APPLICATION_COMMANDS[key] = cmd;
	}
});