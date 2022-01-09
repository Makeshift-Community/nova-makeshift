const Command = require('./../../utils/novaCommand')
const info = require('./../../../package.json')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'developer',
      name: 'info',
      aliases: ['about'],
      description: 'Displays information about this bot.'
    }
    super(client, options)
  }

  async run (message) {
    try {
      await message.channel.send(
        stripIndents`__**Nova version ${info.version}**__
				${info.description}
				Programmed by ${info.author}.
				GitHub: <${info.repository.url}>
				*Please issue the \`${message.client.commandPrefix}help\` command if you wish to view a list of commands.*`
      )
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
