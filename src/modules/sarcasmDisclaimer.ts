import { Message } from "discord.js";

const trigger = /(?:^|\s)\/s$/;

export default async function (message: Message) {
  // Check
  if (message.guild === null) {
    return;
  }
  const hasTrigger = trigger.test(message.content);
  if (!hasTrigger) return;

  await message.channel.send("*(That was sarcasm)*").catch(console.error);
}
