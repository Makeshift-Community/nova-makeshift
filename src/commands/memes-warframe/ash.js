const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ash',
      aliases: ['bladestorm'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439503102484152320/ash.jpg' } } }
    ]
    this.sendOne(message, options, args, 'Ash')
  }
}
