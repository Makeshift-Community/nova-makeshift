const Command = require('../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'baro',
      aliases: ['disappointment'],
      group: 'memes-warframe',
      description: "Baro Ki'Teer"
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439503858973278208/disappointment.jpg' } } }
    ]
    this.sendOne(message, options, args, "Baro Ki'Teer")
  }
}
