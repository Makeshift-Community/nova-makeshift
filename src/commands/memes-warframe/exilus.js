const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'exilus',
      aliases: ['exilusadapter', 'tomato'],
      group: 'memes-warframe',
      description: 'Exilus Adapter'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439743337587671040/exilus.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
