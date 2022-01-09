const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'droptable',
      aliases: ['drops', 'droptables', 'repo', 'repository'],
      group: 'resources',
      description: 'Warframe drop table'
    })
  }

  async run (message) {
    try {
      await message.channel.send(
        stripIndents`Official repository released by Digital Extremes:
				<http://www.warframe.com/repos/hnfvc0o3jnfvc873njb03enrf56.html>
				*~~Probably rigged~~ automatically generated and contains all drop chances.
				There are currently no publicly-known, datamined repositories available.*`
      )
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
