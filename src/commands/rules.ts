import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  heading,
} from "discord.js";
import Command from "../Command.js";

const name = "rule";

const rule1SubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("1")
  .setDescription("Rule 1: Don't be an asshole");

const rule2SubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("2")
  .setDescription("Rule 2: Placeholder");

const rule3SubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("3")
  .setDescription("Rule 3: Placeholder");

const rule4SubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("4")
  .setDescription("Rule 4: Placeholder");

const rule5SubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("5")
  .setDescription("Rule 5: Placeholder");

const rule6SubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("6")
  .setDescription("Rule 6: Placeholder");

const rule7SubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("7")
  .setDescription("Rule 7: Placeholder");

const builder = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Displays the community rules")
  .addSubcommand(rule1SubcommandBuilder)
  .addSubcommand(rule2SubcommandBuilder)
  .addSubcommand(rule3SubcommandBuilder)
  .addSubcommand(rule4SubcommandBuilder)
  .addSubcommand(rule5SubcommandBuilder)
  .addSubcommand(rule6SubcommandBuilder)
  .addSubcommand(rule7SubcommandBuilder);

type SubcommandResponse = {
  title: string;
  description: string;
};

interface SubcommandResponseCollection {
  [key: string]: SubcommandResponse | undefined;
}

const subcommandResponses: SubcommandResponseCollection = {
  [rule1SubcommandBuilder.name]: {
    title: "Rule 1: Don't be an asshole",
    description:
      'Our top rule. Please use common sense. Avoid drama and posting unnecessarily provocative ("edgy") content. Handle personal conflicts privately.',
  },
  [rule2SubcommandBuilder.name]: {
    title: "Rule 2: Controversial topics are okay",
    description:
      "You can discuss controversial topics, but don't deliberately spread propaganda",
  },
  [rule3SubcommandBuilder.name]: {
    title: "Rule 3: You deserve a warning",
    description:
      "Everyone will get at least one clear warning before a ban, except in extreme cases. A warning blocks your access to our community services until you acknowledge it. A ban means permanent exclusion from our community services.",
  },
  [rule4SubcommandBuilder.name]: {
    title: "Rule 4: Maintain a recognizable name",
    description:
      "Maintain a consistent nickname across our community services. Keep it tasteful and unobtrusive.",
  },
  [rule5SubcommandBuilder.name]: {
    title: "Rule 5: 14 days of inactivity are okay",
    description:
      'You can be inactive for up to 14 days without notice. For longer periods, notify moderators. During long periods without updates ("content droughts") in games like Warframe, we\'re more lenient. However, 60 days is our hard limit.',
  },
  [rule6SubcommandBuilder.name]: {
    title: "Rule 6: Stay engaged with the community",
    description:
      "If you leave the Discord server or aren't active, we'll assume you're no longer interested in our community and may remove (\"kick\") you from our community services. Exiting specific groups like the Warframe clan doesn't exclude you from our other offerings.",
  },
  [rule7SubcommandBuilder.name]: {
    title: "Rule 7: Tag NSFW content",
    description:
      "You can post NSFW content if properly tagged. Use NSFW tags if available. Otherwise, use spoiler tags.",
  },
};

async function handle(interaction: ChatInputCommandInteraction) {
  const subcommandName = interaction.options.getSubcommand();

  // Get data
  const subcommandResponse = subcommandResponses[subcommandName];
  if (!subcommandResponse) {
    await interaction.reply("Something went wrong");
    return;
  }

  // Formatting
  let response = subcommandResponse.title;
  response = heading(response, 2);
  response += "\n";
  response += subcommandResponse.description;

  // Respond
  await interaction.reply(response);
}

export default {
  name,
  builder,
  handle,
} as Command;
