const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'limbo',
      aliases: ['limbopostnerf', 'limboprebuff', 'limboprerework', 'limbopostrework'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439508133988139009/limbo.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
