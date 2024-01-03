import COMMON_CONFIG from "../resources/common.js";
const { SUPPORT_GUILD_EMOJIS, SUPPORT_GUILD_ID } = COMMON_CONFIG;
const { SOONTM: EMOJI_ID } = SUPPORT_GUILD_EMOJIS;
const TRIGGER = /soon$/i;
export default async function (message) {
    // Check if message was issued on a guild
    if (message.guild === null) {
        return;
    }
    // Check if message ends with "soon"
    const hasTrigger = TRIGGER.test(message.content);
    if (!hasTrigger) {
        return;
    }
    const guild = await message.client.guilds
        .fetch(SUPPORT_GUILD_ID)
        .catch(console.error);
    const emoji = await guild?.emojis?.fetch(EMOJI_ID).catch(console.error);
    if (emoji === undefined) {
        return;
    }
    message.react(emoji).catch(console.error);
}
