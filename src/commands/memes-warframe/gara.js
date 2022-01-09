const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'gara',
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439751814762594305/gara.jpg' } } }
      // Image of Gara in snow fort
    ]
    this.sendOne(message, options, args, 'Gara')
  }
}
