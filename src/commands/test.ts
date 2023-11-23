import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../Command.js";

const name = "test";

const builder = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Test command");

async function handle(interaction: ChatInputCommandInteraction) {
  await interaction.reply("Test command works!");
}

export default {
  name,
  builder,
  handle,
} as Command;
