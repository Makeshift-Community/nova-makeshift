const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'discount',
      aliases: ['75', '75%', '75off', '75%off', 'wallet', 'platinum'],
      group: 'memes-warframe',
      description: '75% Platinum discount'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439503920398860290/discount.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}
