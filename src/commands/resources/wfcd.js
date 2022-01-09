const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'wfcd',
      group: 'resources',
      description: 'Warframe community Discord'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Warframe Community Discord:
			https://discord.gg/warframe
			The biggest Discord server dedicated to Warframe.`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
