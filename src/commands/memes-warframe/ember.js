const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ember',
      aliases: ['thisisfine', 'fine'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439740633268355072/ember.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}
