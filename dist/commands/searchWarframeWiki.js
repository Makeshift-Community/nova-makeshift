import { SlashCommandStringOption, SlashCommandBuilder, } from "discord.js";
import axios from "axios";
const WikiArticleSearcher = axios.create({
    baseURL: "https://warframe.fandom.com/api.php",
    timeout: 10000,
    headers: {
        "User-Agent": "axios",
    },
    params: {
        action: "opensearch",
        format: "json",
        namespace: "0",
        limit: "1",
    },
});
const name = "wiki";
const searchTermStringOption = new SlashCommandStringOption()
    .setRequired(true)
    .setName("search")
    .setDescription("The term to search for");
const builder = new SlashCommandBuilder()
    .setName(name)
    .setDescription("Search the official Warframe Wiki")
    .addStringOption(searchTermStringOption);
async function handle(interaction) {
    const searchTerm = interaction.options.getString(searchTermStringOption.name, searchTermStringOption.required);
    // Defer
    await interaction.deferReply();
    // Search for entry
    const search = await WikiArticleSearcher.get("/", {
        params: { search: searchTerm },
    });
    const data = search.data;
    console.log(data);
    const pageName = data[1][0];
    const pageUrl = data[3][0];
    if (pageName === "WARFRAME Wiki") {
        await interaction.editReply("No results found");
        return;
    }
    // Format response
    await interaction.editReply(pageUrl);
}
export default {
    name,
    builder,
    handle,
};
