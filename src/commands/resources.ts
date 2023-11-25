import { italic, bracketed } from "../utils/customFormatters.js";

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  hideLinkEmbed,
  hyperlink,
} from "discord.js";
import Command from "../Command.js";

const name = "resource";

const wikiSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("wiki")
  .setDescription("Link to the official Wiki");

const overframeSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("overframe")
  .setDescription("Link to a community-run build sharing site");

const marketSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("market")
  .setDescription("Link to a community-run market");

const dropsSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("drops")
  .setDescription("Link to the official drop tables");

const wfcdSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("wfcd")
  .setDescription("Link to a community-run Discord server");

const discordSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("discord")
  .setDescription("Link to the official Discord server");

const redditSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("reddit")
  .setDescription("Link to the official subreddit");

const websiteSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("website")
  .setDescription("Link to the official website");

const forumsSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("forums")
  .setDescription("Link to the official forums");

const glyphSubcommandBuilder = new SlashCommandSubcommandBuilder()
  .setName("glyph")
  .setDescription("Link to a community-run forum post with a list of glyphs");

const builder = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Links to various Warframe tools")
  .addSubcommand(wikiSubcommandBuilder)
  .addSubcommand(overframeSubcommandBuilder)
  .addSubcommand(marketSubcommandBuilder)
  .addSubcommand(dropsSubcommandBuilder)
  .addSubcommand(wfcdSubcommandBuilder)
  .addSubcommand(discordSubcommandBuilder)
  .addSubcommand(redditSubcommandBuilder)
  .addSubcommand(websiteSubcommandBuilder)
  .addSubcommand(forumsSubcommandBuilder)
  .addSubcommand(glyphSubcommandBuilder);

const AFFILIATION_DISCLAIMER =
  "Note: This community is not affiliated with Digital Extremes";

type SubcommandResponse = {
  url: string;
  displayEmbed?: boolean;
  disclaimer?: string;
  disclaimerSource?: string;
};

interface SubcommandResponseCollection {
  [key: string]: SubcommandResponse | undefined;
}

const subcommandResponses: SubcommandResponseCollection = {
  [wikiSubcommandBuilder.name]: {
    url: "https://warframe.fandom.com/wiki/WARFRAME_Wiki",
    displayEmbed: false,
    disclaimer:
      "Note: While this community is not operated by Digital Extremes, it is officially endorsed by them",
    disclaimerSource:
      "https://warframe.fandom.com/wiki/WARFRAME_Wiki:Official_Wiki",
  },
  [overframeSubcommandBuilder.name]: {
    url: "https://overframe.gg/",
    displayEmbed: true,
    disclaimer: AFFILIATION_DISCLAIMER,
  },
  [marketSubcommandBuilder.name]: {
    url: "https://warframe.market/",
    displayEmbed: true,
    disclaimer: AFFILIATION_DISCLAIMER,
  },
  [dropsSubcommandBuilder.name]: {
    url: "https://www.warframe.com/droptables",
    displayEmbed: false,
  },
  [wfcdSubcommandBuilder.name]: {
    url: "https://discord.gg/warframe",
    displayEmbed: true,
    disclaimer: AFFILIATION_DISCLAIMER,
  },
  [discordSubcommandBuilder.name]: {
    url: "https://discord.gg/playwarframe",
    displayEmbed: true,
  },
  [redditSubcommandBuilder.name]: {
    url: "https://www.reddit.com/r/Warframe/",
    displayEmbed: false,
    disclaimer: AFFILIATION_DISCLAIMER,
  },
  [forumsSubcommandBuilder.name]: {
    url: "https://forums.warframe.com/",
    displayEmbed: false,
  },
  [glyphSubcommandBuilder.name]: {
    url: "https://forums.warframe.com/topic/992008-free-promocodes-and-glyphs-all-platforms/",
    displayEmbed: true,
    disclaimer:
      "Note: This content is not officially endorsed by Digital Extremes",
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
  let formattedUrl = subcommandResponse.url;
  if (!subcommandResponse.displayEmbed) {
    formattedUrl = hideLinkEmbed(formattedUrl);
  }

  let formattedDisclaimerSource = subcommandResponse.disclaimerSource;
  if (formattedDisclaimerSource) {
    formattedDisclaimerSource = hideLinkEmbed(formattedDisclaimerSource);
    formattedDisclaimerSource = hyperlink("Source", formattedDisclaimerSource);
    formattedDisclaimerSource = bracketed(formattedDisclaimerSource);
    formattedDisclaimerSource = ` ${formattedDisclaimerSource}`;
  } else {
    formattedDisclaimerSource = "";
  }

  let formattedDisclaimer = subcommandResponse.disclaimer;
  if (formattedDisclaimer) {
    formattedDisclaimer = `${formattedDisclaimer}${formattedDisclaimerSource}`;
    formattedDisclaimer = italic(formattedDisclaimer);
    formattedDisclaimer = `\n${formattedDisclaimer}`;
  } else {
    formattedDisclaimer = "";
  }

  const response = `${formattedUrl}${formattedDisclaimer}`;

  // Respond
  await interaction.reply(response);
}

export default {
  name,
  builder,
  handle,
} as Command;
