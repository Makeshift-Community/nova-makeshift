const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'twinrogga',
      aliases: ['rogga'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439740738474082314/twinrogga.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}
