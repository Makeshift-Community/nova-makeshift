const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'harrowrepel',
      aliases: ['repel', 'cease', 'begone'],
      group: 'memes-warframe',
      description: 'CEASE!'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439740571985248277/harrowrepel.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}
