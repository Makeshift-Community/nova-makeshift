import { GuildMember, TextChannel } from "discord.js";
import { GUILD_ID, TEXT_CHANNELS } from "../resources/makeshift.js";
const GENERAL_CHANNEL_ID = TEXT_CHANNELS.GENERAL_ID;

export default async function (member: GuildMember) {
  // Check if member joined Makeshift guild
  const guild = member.guild;
  if (guild.id !== GUILD_ID) return;

  // Get general channel
  const channel = await guild.channels
    .fetch(GENERAL_CHANNEL_ID)
    .catch(console.error);
  // Sanity check
  if (!(channel instanceof TextChannel)) {
    console.error(`General channel not found in Makeshift guild.`);
    return;
  }

  // Send welcome message
  channel
    .send(`Welcome to the Makeshift clan Discord, ${member.toString()}!`)
    .catch(console.error);
}
