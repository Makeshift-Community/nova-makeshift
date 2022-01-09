const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'folren',
      aliases: ['folrunhow'],
      group: 'resources',
      description: "Folren's Riven Epicness Server"
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Folren's Riven Epicness Server:
			https://discord.gg/rnzSW6k
			*Home of Folrunhow, a bot for estimating Riven prices.*`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
