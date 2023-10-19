import Command from "../Command.js";

import { inspect } from "util";
import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  InteractionEditReplyOptions,
  SlashCommandBooleanOption,
  SlashCommandStringOption,
  codeBlock,
} from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const name = "eval";

async function handle(interaction: ChatInputCommandInteraction) {
  const prompt = interaction.options.getString("prompt", true);
  const discrete = interaction.options.getBoolean("discrete", false) ?? true;

  // Defer
  await interaction.deferReply({ ephemeral: discrete });

  // Check permissions
  const application = await interaction.client.application.fetch();
  const owner = application.owner;
  if (owner === null) {
    console.error("Eval: Owner is null.");
    await interaction.editReply("Owner is null");
    return;
  }
  if (interaction.user.id !== owner.id) {
    console.error("Eval: Not authorized.");
    await interaction.editReply("Not authorized");
    return;
  }

  // Evaluate
  let rawResponse: unknown;
  try {
    rawResponse = await eval(prompt);
  } catch (error) {
    rawResponse = error;
  }

  // Format response
  const responseString = inspect(rawResponse, { depth: 0 });
  const formattedResponse = codeBlock("javascript", responseString);
  if (formattedResponse.length <= 2000) {
    // Send as regular message
    await interaction.editReply(formattedResponse);
  } else {
    // Send as file
    const file = new AttachmentBuilder(Buffer.from(responseString))
      .setName("eval.txt")
      .setDescription("The evaluated result of the prompt.");
    const payload: InteractionEditReplyOptions = {
      files: [file],
    };
    await interaction.editReply(payload);
  }
}

const createPromptOption = function (option: SlashCommandStringOption) {
  option
    .setRequired(true)
    .setName("prompt")
    .setDescription("The code to evaluate");
  return option;
};
const createDiscreteOption = function (option: SlashCommandBooleanOption) {
  option
    .setRequired(false)
    .setName("discrete")
    .setDescription("Whether or not to respond privately");
  return option;
};
const builder = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Evaluate an expression for debugging purposes")
  .addStringOption((option) => createPromptOption(option))
  .addBooleanOption((option) => createDiscreteOption(option));

export default {
  name,
  builder,
  handle,
} as Command;
