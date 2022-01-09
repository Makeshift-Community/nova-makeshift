const Command = require('./../../utils/novaCommand')
const { name } = require('./../../../package.json')

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'developer',
      name: 'shutdown',
      description: 'Shuts a part of Nova down',
      ownerOnly: true
    }
    super(client, options)
  }

  async run (msg, args) {
    if (args.toLowerCase() !== name) return
    console.log(`Bot ended by user ${msg.author.tag}`)
    await msg.react('💙')
      .catch(console.error)
    msg.client.destroy()
    process.exit(0)
  }
}
