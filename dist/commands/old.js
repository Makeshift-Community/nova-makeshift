import { SlashCommandBuilder, SlashCommandSubcommandBuilder, hideLinkEmbed, hyperlink, italic, } from "discord.js";
const name = "warframe-resource";
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
async function handle(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const AFFILIATION_DISCLAIMER = "Note: This community is not affiliated with Digital Extremes";
    const FORMATTED_AFFILIATION_DISCLAIMER = italic(AFFILIATION_DISCLAIMER);
    switch (subcommand) {
        case wikiSubcommandBuilder.name: {
            const ENDORSEMENT_DISCLAIMER = `Note: While this community is not operated by Digital Extremes, it is officially endorsed by them`;
            const SOURCE_URL = "https://warframe.fandom.com/wiki/WARFRAME_Wiki:Official_Wiki";
            const SOURCE_URL_WITH_HIDDEN_EMBED = hideLinkEmbed(SOURCE_URL);
            const MASKED_SOURCE_LINK = hyperlink("Source", SOURCE_URL_WITH_HIDDEN_EMBED);
            const SOURCE = `\\[${MASKED_SOURCE_LINK}\\]`;
            const ENDORSEMENT_DISCLAIMER_WITH_SOURCE = italic(`${ENDORSEMENT_DISCLAIMER} ${SOURCE}`);
            const URL = "https://warframe.fandom.com/wiki/WARFRAME_Wiki";
            const URL_WITH_HIDDEN_EMBED = hideLinkEmbed(URL);
            await interaction.reply(`${URL_WITH_HIDDEN_EMBED}\n${ENDORSEMENT_DISCLAIMER_WITH_SOURCE}`);
            break;
        }
        case overframeSubcommandBuilder.name: {
            const URL = "https://overframe.gg/";
            const URL_WITH_HIDDEN_EMBED = hideLinkEmbed(URL);
            await interaction.reply(`${URL_WITH_HIDDEN_EMBED}\n${FORMATTED_AFFILIATION_DISCLAIMER}`);
            break;
        }
        case marketSubcommandBuilder.name: {
            const URL = "https://warframe.market/";
            const URL_WITH_HIDDEN_EMBED = hideLinkEmbed(URL);
            await interaction.reply(`${URL_WITH_HIDDEN_EMBED}\n${FORMATTED_AFFILIATION_DISCLAIMER}`);
            break;
        }
        case dropsSubcommandBuilder.name: {
            const URL = "https://www.warframe.com/droptables";
            const URL_WITH_HIDDEN_EMBED = hideLinkEmbed(URL);
            await interaction.reply(URL_WITH_HIDDEN_EMBED);
            break;
        }
        case wfcdSubcommandBuilder.name: {
            const URL = "https://discord.gg/warframe";
            await interaction.reply(`${URL}\n${FORMATTED_AFFILIATION_DISCLAIMER}`);
            break;
        }
        case discordSubcommandBuilder.name: {
            const URL = "https://discord.gg/playwarframe";
            await interaction.reply(URL);
            break;
        }
        case redditSubcommandBuilder.name: {
            const URL = "https://www.reddit.com/r/Warframe/";
            const URL_WITH_HIDDEN_EMBED = hideLinkEmbed(URL);
            await interaction.reply(`${URL_WITH_HIDDEN_EMBED}\n${FORMATTED_AFFILIATION_DISCLAIMER}`);
            break;
        }
        case websiteSubcommandBuilder.name: {
            const URL = "https://www.warframe.com/";
            const URL_WITH_HIDDEN_EMBED = hideLinkEmbed(URL);
            await interaction.reply(URL_WITH_HIDDEN_EMBED);
            break;
        }
        case forumsSubcommandBuilder.name: {
            const URL = "https://forums.warframe.com/";
            const URL_WITH_HIDDEN_EMBED = hideLinkEmbed(URL);
            await interaction.reply(URL_WITH_HIDDEN_EMBED);
            break;
        }
        case glyphSubcommandBuilder.name: {
            const URL = "https://forums.warframe.com/topic/992008-free-promocodes-and-glyphs-all-platforms/";
            const URL_WITH_HIDDEN_EMBED = hideLinkEmbed(URL);
            const ENDORSEMENT_DISCLAIMER = `Note: While this community is not operated by Digital Extremes, it is officially endorsed by them`;
            const FORMATTED_ENDORSEMENT_DISCLAIMER = italic(ENDORSEMENT_DISCLAIMER);
            await interaction.reply(`${URL_WITH_HIDDEN_EMBED}\n${FORMATTED_ENDORSEMENT_DISCLAIMER}`);
            break;
        }
        default:
            await interaction.reply("Something went wrong");
            break;
    }
}
export default {
    name,
    builder,
    handle,
};
