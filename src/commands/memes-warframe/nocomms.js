const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'nocomms',
      aliases: ['nocommraid', 'chaosraid'],
      group: 'memes-warframe',
      description: 'Raids without voice chat'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439508552827273216/nocomms.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
