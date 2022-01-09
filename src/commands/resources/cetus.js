const Command = require('./../../utils/novaCommand')
const worldState = require('./../../utils/worldstate')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'cetus',
      aliases: [
      ],
      group: 'resources',
      description: 'DEBUG'
    })
  }

  async run (message) {
    try {
      console.log('CETUS RAN')
      await worldState()
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
