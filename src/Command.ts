import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface Command {
  name: string;
  builder: SlashCommandBuilder;
  handle(interaction: ChatInputCommandInteraction): Promise<void>;
}
