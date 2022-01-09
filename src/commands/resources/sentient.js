const Command = require('./../../utils/novaCommand')
const worldState = require('./../../utils/worldstate')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'sentient',
      aliases: [
      ],
      group: 'resources',
      description: 'DEBUG'
    })
  }

  async run (message) {
    try {
      var body = await worldState()
      await message.channel.send(`DEBUG:\n\`\`\`${body.Tmp}\`\`\``)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
