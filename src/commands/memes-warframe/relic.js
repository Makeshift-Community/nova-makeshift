const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'relic',
      aliases: ['cabbage', 'relics', 'cabbages'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439743832087592962/relic.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}
