import { italic } from "discord.js";
/**
 * This regex checks that a message ends with "/s" under the following conditions:
 * - There is a space, punctuation or simply nothing before the "/s"
 * - There are only spaces and/or punctuation after the "/s"
 */
const TRIGGER = /(?:^|[\p{S}\s])\/s[\p{S}\s]*$/u;
export default async function (message) {
    // Check
    if (message.guild === null) {
        return;
    }
    const hasTrigger = TRIGGER.test(message.content);
    if (!hasTrigger)
        return;
    let response = "(That was sarcasm)";
    response = italic(response);
    await message.channel.send(response).catch(console.error);
}
