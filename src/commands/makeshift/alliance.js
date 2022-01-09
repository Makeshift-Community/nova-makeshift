const Command = require('./../../utils/makeshiftCommand')

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'makeshift',
      name: 'alliance',
      description: 'Link to the alliance Discord'
    }
    super(client, options)
  }

  async run (message) {
    if (!this.guildCheck(message)) return
    try {
      await message.channel.send("We're not in an alliance right now.")
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
