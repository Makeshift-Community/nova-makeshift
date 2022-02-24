import handleInteractions from '../commands/index.js'

export default function (client) {
  client.on('interactionCreate', handle)
}

const handle = async function (interaction) {
  console.log("interactionCreate")
  handleInteractions(interaction)
}
