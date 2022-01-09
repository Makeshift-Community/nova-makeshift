import handleGreet from '../modules/greet.js'
import handleInitialColor from '../modules/initialColor.js'

export default function (client) {
  client.on('guildMemberAdd', handle)
}

const handle = async function (member) {
  await handleGreet(member)
  await handleInitialColor(member)
}
