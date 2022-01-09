const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ivara',
      aliases: ['zipline'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439506938892386322/ivara.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
