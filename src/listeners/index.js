import handleMessages from './messageCreate.js'
import handleGuildMemberAdd from './guildMemberAdd.js'
import handleVoiceStateUpdate from './voiceStateUpdate.js'
import handleInteractionCreate from './interactionCreate.js'

export default function (client) {
  handleMessages(client)
  handleGuildMemberAdd(client)
  handleVoiceStateUpdate(client)
  handleInteractionCreate(client)
}
