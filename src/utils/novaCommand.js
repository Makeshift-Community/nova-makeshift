const { Command } = require('discord.js-commando')
const select = require('./selectRandomly')

/**
 * A command that makes creating Commando-commands a bit easier. Copies name into memberName and adds an empty description if none is provided.
 * @extends Command
 */
module.exports = class extends Command {
  /**
	 * Constructor for novaCommands.
	 * @param {*} client The CommandoClient.
	 * @param {*} info The CommandInfo.
	 */
  constructor (client, info) {
    info.memberName = info.name
    if (info.description === undefined) info.description = ''
    super(client, info)
  }

  /**
	 * Selects one of the provided options mathing the provided arguments and sends it in the channel.
	 * Omitting or providing an invalid argument randomly select an option.
	 * @param {*} message The original message.
	 * @param {*} options An array of message data.
	 * @param {*} args The original args.
	 * @param {String} name An (optional) name.
	 */
  async sendOne (message, options, args, name = 'Choice') {
    try {
      await message.channel.send(select(options, args, name))
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
