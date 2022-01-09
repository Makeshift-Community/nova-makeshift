const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'raidstats',
      aliases: ['christx', 'trials.wf', 'wf.christx.tw', 'raidtrack', 'raidtracker', 'raidtrackers', 'trials', 'trials.wf'],
      group: 'resources',
      description: 'Raiding history trackers'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Warframe trials tracker:
			https://trials.wf/
			*A page tracking and listing all past Warframe raids.*`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
