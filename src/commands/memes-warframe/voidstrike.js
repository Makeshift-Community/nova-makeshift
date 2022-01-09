const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'voidstrike',
      group: 'memes-warframe',
      description: 'Void Strike'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439932625180688384/voidstrike.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}
