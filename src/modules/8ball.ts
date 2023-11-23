// Dependencies
import { Message, User } from "discord.js";
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

function pickAnswer(author: User): string {
  const nRandom = Math.random();

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
  if (message.guild === null) {
    return;
  }
  const trigger = /^Nova,\s/i;
  const hasTrigger = trigger.test(message.content);
  if (!hasTrigger) {
    return;
  }

  // Appropriate response to Zephyr
  const zephyrTrigger = /zephyr/i;
  const hasZephyrTrigger = zephyrTrigger.test(message.content);
  if (hasZephyrTrigger) {
    return "Zephyr is a useless piece of shit, stop asking.";
  }

  // Pick randomized answer
  const answer = pickAnswer(message.author);
  await message.channel.send(answer);
}
