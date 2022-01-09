const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'archives',
      aliases: ['wfta', 'ta', 'warframearchives', 'warframeteachingarchives'],
      group: 'resources',
      description: 'Warframe Teaching Archives Discord'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Warframe Teaching Archives:
			https://discord.gg/6KEZzbu
			*A Discord server for modding and building weapons, asking questions and teaching Open-World content.*`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
