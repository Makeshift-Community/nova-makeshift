const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'tiberon',
      aliases: ['toblerone', 'tiberonprime', 'tobleroneprime'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439740797907107840/tiberon.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}
