import { GUILD as GUILD_ID, TEXTCHANNELS } from '../resources/makeshift.js'
const CHANNEL_ID = TEXTCHANNELS.GENERAL

export default async function (member) {
  // Check if member joined Makeshift guild
  const guild = member.guild
  if (guild.id !== GUILD_ID) return

  const channel = await guild.channels.fetch(CHANNEL_ID)
    .catch(console.error)
  if (channel === undefined) { return }

  channel.send(`Welcome to the Makeshift clan Discord, ${member}!`)
    .catch(console.error)
}
