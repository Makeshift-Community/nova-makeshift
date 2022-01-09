import { GUILD as GUILD_ID, EMOJIS } from '../resources/backend.js'

const EMOJI_ID = EMOJIS.SOONTM

const trigger = /soon$/gi

export default async function (message) {
  // Check if message was issued on a guild
  if (message.guild === undefined) { return }
  // Check if message ends with "soon"
  if (trigger.test(message.content) === false) { return }

  const guild = message.client.guilds.fetch(GUILD_ID)
  const emoji = guild.emojis.fetch(EMOJI_ID)
  message.react(emoji)
    .catch(console.error)
}
