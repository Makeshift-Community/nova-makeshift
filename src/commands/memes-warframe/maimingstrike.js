const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'maimingstrike',
      aliases: ['maiming', 'ms', 'memeingstrike', 'memestrike'],
      group: 'memes-warframe',
      description: 'Maiming Strike'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439743493758386188/maimingstrike1.png' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439931239621984277/maimingstrike2.png' } } }
    ]
    this.sendOne(message, options, args, 'Maiming Strike')
  }
}
