const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'tradechat',
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439509583451521025/tradechat.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}
