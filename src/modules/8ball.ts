// Dependencies
import { Message } from "discord.js";
import _ from "lodash";

const RARE_RESPONSES = [
  "My answer-module broke. Could you ask me again?",
  "Oh my gosh.. 🙄",
  "¯\\\\_(ツ)\\_/¯",
  "Are you okay?",
  "Ask me later",
  "Try again",
  "Don't annoy me",
  "Alright 🙄",
  "You sound like a Limbo-main.",
  "Fuck off.",
] as const;

const UNCOMMON_RESPONSES = [
  "Not sure",
  "Dunno",
  "WTF?",
  "ಠ_ಠ",
  "Uuuuhhhh~",
  "K",
  "Forget it",
  "._.",
  "Okay",
  "N-No!",
] as const;

const COMMON_RESPONSES = [
  "Certainly",
  "Yeah",
  "Most likely",
  "Yes",
  "NO!",
  "(☞ﾟヮﾟ)☞           No",
  "Nah",
  "Nope",
  "Doubt it",
  "Nuh-uh~",
  "No.",
  "Never ever",
  "No",
  "How about no?",
  "Absolutely",
  "Why not?",
  "Not really",
  "Negative.",
  "No way!",
  "Absolutely... **NOT!**",
  "👎",
  "👍",
  "Definitely",
  "No?",
  "No Thanks!",
  "Not on my watch",
  "**NEIN!**",
] as const;

function pickResponse(message: Message): string {
  // Appropriate response to ~~Zephyr~~ Yareli
  const TRIGGER = /yareli/i;
  const mentionsYareli = TRIGGER.test(message.content);
  if (mentionsYareli) {
    return "Yareli is a useless piece of shit, stop asking.";
  }

  // Random response
  const nRandom = Math.random();
  const { author } = message;
  // LEGENDARY
  if (nRandom * 1000 < 1) return `Love you, ${author.toString()} 😘`;
  // RARE
  if (nRandom * 15 < 1) {
    return _.sample(RARE_RESPONSES);
  }
  // UNCOMMON
  if (nRandom * 5 < 1) {
    return _.sample(UNCOMMON_RESPONSES);
  }
  // COMMON
  return _.sample(COMMON_RESPONSES);
}

export default async function (message: Message) {
  // Check if message was received on guild
  if (!message.inGuild()) {
    return;
  }

  // Check if message contains trigger
  const TRIGGER = /^Nova,\s/i;
  const hasTrigger = TRIGGER.test(message.content);
  if (!hasTrigger) {
    return;
  }

  // Pick response
  const response = pickResponse(message);

  // Send response
  await message.channel.send(response);
}
