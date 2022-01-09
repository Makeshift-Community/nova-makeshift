const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'no',
      aliases: ['scottno'],
      group: 'memes-warframe',
      description: 'No.'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439508485403574273/no.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
