const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'saryn',
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439509371354087445/saryn.jpg' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439742855330791425/saryn2.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}
