const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'tennoclock',
      aliases: ['tennoclocknews', 'tcn', 'tgdm'],
      group: 'resources',
      description: 'TennoClockNews, a news site run by a veteran'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Tenno Clock News (TCN):
			<https://www.tennoclocknews.com/>
			*A Warframe news website with articles written by TGDM.*`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
