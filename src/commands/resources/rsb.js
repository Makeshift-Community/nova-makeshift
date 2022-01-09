const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'rsb',
      aliases: ['wfrsb', 'schoolbus', 'raidschoolbus', 'recruitmentschoolbus'],
      group: 'resources',
      description: 'Warframe recruitment schoolbus Discord'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Warframe Recruitment Schoolbus:
			https://discord.gg/wfrsb
			*Formerly the Warframe Raid Schoolbus, a server that was dedicated to Warframe raids.
			Now they're a tight-knit community focused on helping new players out.*`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
