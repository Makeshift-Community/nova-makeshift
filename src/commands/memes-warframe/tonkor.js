const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'tonkor',
      aliases: ['nerf'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439509519761014784/tonkor.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
