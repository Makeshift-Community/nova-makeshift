import { SlashCommandBuilder } from "discord.js";
const name = "test";
const builder = new SlashCommandBuilder()
    .setName(name)
    .setDescription("Test command");
async function handle(interaction) {
    await interaction.reply("Test command works!");
}
export default {
    name,
    builder,
    handle,
};
