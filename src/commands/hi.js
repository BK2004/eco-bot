import { SlashCommandBuilder } from "discord.js";
export const type = "APP_CMD";
export const data = new SlashCommandBuilder()
	.setName("hi")
	.setDescription("Say hello to the bot!");
export const exec = async (interaction) => {
	interaction.reply(`Hi <@${interaction.user.id}>!`);
}
