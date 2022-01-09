const Command = require('./../../utils/novaCommand')
const { name } = require('./../../../package.json')

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'developer',
      name: 'restart',
      description: 'Restarts a part of Nova',
      ownerOnly: true
    }
    super(client, options)
  }

  async run (message, args) {
    if (args.toLowerCase() !== name) return
    await message.react('💙')
      .catch(console.error)
    console.log(`Bot restarted by user ${message.author.tag}`)
    process.exit(1)
  }
}
