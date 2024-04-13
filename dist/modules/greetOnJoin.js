import { TextChannel } from "discord.js";
import CONFIG from "../resources/configuration.js";
const { GUILD_ID, TEXT_CHANNELS } = CONFIG;
const { GENERAL_CHANNEL_ID } = TEXT_CHANNELS;
import _ from "lodash";
const SUBJECTS = [
    "Ryan Gosling movie",
    "anime",
    "movie",
    "video game",
    "food",
    "Warframe",
    "animal",
    "music genre",
    "YouTube channel",
    "vegetarian dish",
    "fruit",
    "vegetable",
    "Pokémon",
];
export default async function (member) {
    // Check if member joined Makeshift guild
    const guild = member.guild;
    if (guild.id !== GUILD_ID)
        return;
    // Check if member is a bot
    if (member.user.bot)
        return;
    // Get general channel
    const channel = await guild.channels
        .fetch(GENERAL_CHANNEL_ID)
        .catch(console.error);
    // Sanity check
    if (!(channel instanceof TextChannel)) {
        console.error(`General channel not found in Makeshift guild.`);
        return;
    }
    const subject = _.sample(SUBJECTS);
    // Send welcome message
    channel
        .send(`Welcome to the Makeshift community Discord, ${member.toString()}. State your favorite ${subject}, NOW!`)
        .catch(console.error);
}
