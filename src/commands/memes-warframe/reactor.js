const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'reactor',
      aliases: ['orokinreactor'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439745459112902667/reactor.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
