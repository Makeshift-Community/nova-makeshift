const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'deathsnacks',
      aliases: [
        'tracker',
        'tracking'
      ],
      group: 'resources',
      description: 'An event tracker for Warframe'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Deathsnacks' Warframe event tracker:
			<http://deathsnacks.com/wf/index.html>`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
