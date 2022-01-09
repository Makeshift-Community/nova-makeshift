const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'oberon',
      aliases: ['broberon'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439752663853432874/oberon.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
