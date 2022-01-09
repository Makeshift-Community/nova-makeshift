const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'resourcebooster',
      aliases: ['booster', 'kuva', 'kuvabooster'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439508993451491341/resourcebooster.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
