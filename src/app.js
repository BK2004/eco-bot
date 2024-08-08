import { DISCORD_CLIENT, TOKEN, APPLICATION_COMMANDS } from "./config.js";
import * as Discord from "discord.js";

DISCORD_CLIENT.on(Discord.Events.InteractionCreate, async (interaction) => {
	if (interaction.isCommand()) {
		if (interaction.commandName in APPLICATION_COMMANDS) {
			await APPLICATION_COMMANDS[interaction.commandName].exec(interaction);
		}
	}
});

DISCORD_CLIENT.login(TOKEN);