const Command = require('./novaCommand')
const makeshift = require('./../resources/makeshift.json')

/**
 * A class for commands that are only supposed to work on the Makeshift Discord.
 * @extends Command
 */
module.exports = class extends Command {
  /**
	 *
	 * @param {*} client The CommandoClient.
	 * @param {*} options The CommandInfo.
	 */
  constructor (client, options) {
    super(client, options)
    this.guildOnly = true
  }

  /**
	 * Checks if the message has been written on the Makeshift Discord.
	 * @param {*} message The original message.
	 * @returns {Boolean} Wether or not the message was sent on the Makeshift Discord.
	 */
  guildCheck (message) {
    if (!message.guild) {
      decline(message)
      return false
    }
    if (message.guild.id != makeshift.guild) {
      decline(message)
      return false
    }
    // Makeshift guild check passed
    return true
  }

  onBlock (message, reason, data) {
    if (reason === 'guildOnly') {
      decline(message)
    } else {
      super.onBlock(message, reason, data)
    }
  }
}

async function decline (message) {
  try {
    message.channel.send('This command is only available on the Makeshift clan Discord.')
    await message.react('❌')
  } catch (error) {
    console.error(error)
  }
}
