const Command = require('../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'discord',
      alias: ['playwarframe'],
      group: 'resources',
      description: 'Official Warframe Discord'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Official Warframe Discord:
			https://discord.gg/playwarframe`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
