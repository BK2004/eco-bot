import { SlashCommandBuilder } from "discord.js";
import * as FluxDB from "./db.js";

export const data = new SlashCommandBuilder()
	.setName("flux")
	.setDescription("Check how much flux you have!");
export const type = "APP_CMD";
export const exec = async (interaction) => {
	const guildId = interaction.guild.id;
	const userId = interaction.user.id;
	try {
		const balance = await FluxDB.updateBalance(userId, guildId);
		interaction.reply(`<@${userId}> You have ${balance} flux!`);
	} catch (e) {
		interaction.reply({ content: "Sorry, I couldn't get your balance :(", ephemeral: true });
	}
}