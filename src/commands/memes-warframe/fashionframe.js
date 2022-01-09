const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'fashionframe',
      aliases: ['endgame', 'contest', 'fashion', 'ff'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439932070563938305/fashionframe2.jpg' } } }
    ]
    this.sendOne(message, options, args, 'Fashionframe')
  }
}
