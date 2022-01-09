const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'erh',
      aliases: ['eidolon', 'eidolonrecruitmenthub', 'eidolonrecruit', 'recruitmenthub', 'hub'],
      group: 'resources',
      description: 'Eidolon Recruitment Hub Discord'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Eidolon Recruitment Hub:
			http://discord.gg/ytRaRq4
			*A Discord server for hunting Eidolons and Orbs.*`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
