import handleMessages from './message.js'

export default function(client) {
  handleMessages(client)
  handleGuildMemberAdd(client)
}
