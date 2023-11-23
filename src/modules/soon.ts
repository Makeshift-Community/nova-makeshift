import { Message } from "discord.js";
import { GUILD_ID, EMOJIS } from "../resources/backend.js";

const EMOJI_ID = EMOJIS.SOONTM;

const trigger = /soon$/i;

export default async function (message: Message) {
  // Check if message was issued on a guild
  if (message.guild === null) {
    return;
  }
  // Check if message ends with "soon"
  const hasTrigger = trigger.test(message.content);
  if (!hasTrigger) {
    return;
  }

  const guild = await message.client.guilds
    .fetch(GUILD_ID)
    .catch(console.error);
  const emoji = await guild?.emojis?.fetch(EMOJI_ID).catch(console.error);
  if (emoji === undefined) {
    return;
  }
  message.react(emoji).catch(console.error);
}
