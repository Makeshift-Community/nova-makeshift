import handleMessages from './messageCreate.js'

export default function (client) {
  handleMessages(client)
  handleGuildMemberAdd(client)
}
