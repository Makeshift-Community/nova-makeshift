const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'inaros',
      aliases: ['pocketsand'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439506799620784128/inaros.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}
