const Command = require('./../../utils/makeshiftCommand')

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'makeshift',
      name: 'map',
      aliases: ['dojo', 'dojomap'],
      description: 'Map of the Makeshift dojo'
    }
    super(client, options)
  }

  async run (message) {
    if (!this.guildCheck(message)) return
    try {
      await message.channel.send({
        content: 'Makeshift clan dojo map',
        embed: {
          image: {
            url: 'https://cdn.discordapp.com/attachments/437703489347649539/437708566787260426/map.png'
          }
        }
      })
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}
