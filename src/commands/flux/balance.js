import { SlashCommandBuilder } from "discord.js";
import * as FluxDB from "./db.js";

export const data = new SlashCommandBuilder()
	.setName("balance")
	.setDescription("Check your flux balance");
export const type = "APP_CMD";
export const exec = async (interaction) => {
	const guildId = interaction.guild.id;
	const userId = interaction.user.id;
	FluxDB.getBalance(userId, guildId, (err, data) => {
		if (err) {
			interaction.reply({ content: "Sorry, I couldn't get your balance :(", ephemeral: true });
		} else {
			interaction.reply(`<@${userId}> You have ${data.flux} flux!`);
		}
	});
}