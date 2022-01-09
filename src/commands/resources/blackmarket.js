const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'blackmarket',
      aliases: ['bm', 'wartrade'],
      group: 'resources',
      description: 'Warframe Black Market Discord'
    })
  }

  async run (message) {
    try {
      await message.react('✅')
      message.channel.send(stripIndents`WarTrade (formerly Black Market) Discord:
			https://discord.gg/EwD6J37`)
    } catch (error) {
      console.error(error)
    }
  }
}
